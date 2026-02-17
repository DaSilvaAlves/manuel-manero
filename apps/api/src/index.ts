import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import articlesRouter from './routes/articles'
import testimonialsRouter from './routes/testimonials'
import programsRouter from './routes/programs'

// Load environment variables
dotenv.config()

// Initialize Prisma Client
const prisma = new PrismaClient()

// Initialize Express app
const app = express()
const PORT = process.env.API_PORT || 3001
const NODE_ENV = process.env.NODE_ENV || 'development'
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

// Types
interface ApiResponse<T = any> {
  status: 'success' | 'error'
  data?: T
  error?: string
  message?: string
  timestamp: string
}

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request ID middleware (for tracing)
app.use((req: Request, res: Response, next: NextFunction) => {
  ;(req as any).id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  next()
})

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
    )
  })
  next()
})

// Health check endpoint with database verification
app.get('/health', async (req: Request, res: Response) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`

    const response: ApiResponse = {
      status: 'success',
      data: {
        service: 'Manuel Manero API',
        version: '1.0.0',
        environment: NODE_ENV,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    }
    res.json(response)
  } catch (error) {
    console.error('❌ Health check failed:', error)
    const response: ApiResponse = {
      status: 'error',
      error: 'Database connection failed',
      timestamp: new Date().toISOString(),
    }
    res.status(503).json(response)
  }
})

// API version endpoint - Updated with all available routes
app.get('/api/v1', (req: Request, res: Response) => {
  const response: ApiResponse = {
    status: 'success',
    data: {
      message: 'Manuel Manero Ecosystem API v1',
      version: '1.0.0',
      environment: NODE_ENV,
      description: 'RESTful API for Manuel Manero personal branding ecosystem',
      endpoints: {
        health: {
          GET: '/health - Server health check with database verification',
        },
        content: {
          'GET /api/articles': 'List articles with pagination & filtering',
          'GET /api/articles/:slug': 'Get single article by slug',
          'GET /api/testimonials': 'List testimonials with pagination',
          'GET /api/testimonials/:id': 'Get single testimonial by ID',
          'GET /api/programs': 'List programs with optional testimonials',
          'GET /api/programs/:slug': 'Get single program by slug',
          'GET /api/leads': 'List captured leads (legacy)',
          'GET /api/content': 'List all content (legacy)',
        },
        documentation: {
          'Query Params': {
            limit: 'Number of results per page (1-100, default: 10)',
            offset: 'Number of results to skip (default: 0)',
            category: 'Filter by category (articles only)',
            type: 'Filter by type: blog|video|podcast (articles only)',
            published: 'Show only published items (default: true)',
          },
          responses: {
            success: '{ status: "success", data: {...}, timestamp: "ISO-8601" }',
            error: '{ status: "error", error: "message", timestamp: "ISO-8601" }',
          },
        },
      },
    },
    timestamp: new Date().toISOString(),
  }
  res.json(response)
})

// Routes Registration
// Mount route handlers
app.use('/api/articles', articlesRouter)
app.use('/api/testimonials', testimonialsRouter)
app.use('/api/programs', programsRouter)

// Legacy Routes (for backwards compatibility)

// GET /api/v1/leads - Fetch recent leads
app.get('/api/v1/leads', async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100)
    const offset = Math.max(parseInt(req.query.offset as string) || 0, 0)

    const leads = await prisma.lead.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.lead.count()

    const response: ApiResponse = {
      status: 'success',
      data: {
        leads,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      },
      timestamp: new Date().toISOString(),
    }
    res.json(response)
  } catch (error) {
    console.error('❌ Error fetching leads:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch leads',
      timestamp: new Date().toISOString(),
    })
  }
})

// GET /api/v1/programs - Fetch published programs
app.get('/api/v1/programs', async (req: Request, res: Response) => {
  try {
    const programs = await prisma.program.findMany({
      where: { published: true },
      include: {
        testimonials: {
          where: { published: true },
          take: 3,
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    const response: ApiResponse = {
      status: 'success',
      data: {
        programs,
        count: programs.length,
      },
      timestamp: new Date().toISOString(),
    }
    res.json(response)
  } catch (error) {
    console.error('❌ Error fetching programs:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch programs',
      timestamp: new Date().toISOString(),
    })
  }
})

// GET /api/v1/content - Fetch published content
app.get('/api/v1/content', async (req: Request, res: Response) => {
  try {
    const type = req.query.type as string || undefined
    const category = req.query.category as string || undefined
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50)

    const content = await prisma.content.findMany({
      where: {
        published: true,
        ...(type && { type }),
        ...(category && { category }),
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    const response: ApiResponse = {
      status: 'success',
      data: {
        content,
        count: content.length,
        filters: {
          type: type || 'all',
          category: category || 'all',
        },
      },
      timestamp: new Date().toISOString(),
    }
    res.json(response)
  } catch (error) {
    console.error('❌ Error fetching content:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch content',
      timestamp: new Date().toISOString(),
    })
  }
})

// 404 handler
app.use((req: Request, res: Response) => {
  const response: ApiResponse = {
    status: 'error',
    error: 'Route not found',
    data: {
      path: req.path,
      method: req.method,
      availableEndpoints: {
        health: '/health',
        api: '/api/v1',
        leads: '/api/v1/leads',
        programs: '/api/v1/programs',
        content: '/api/v1/content',
      },
    },
    timestamp: new Date().toISOString(),
  }
  res.status(404).json(response)
})

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Unhandled error:', err)

  const response: ApiResponse = {
    status: 'error',
    error: NODE_ENV === 'development' ? err.message : 'Internal server error',
    data: NODE_ENV === 'development' ? { stack: err.stack } : undefined,
    timestamp: new Date().toISOString(),
  }

  res.status(500).json(response)
})

// Start server
async function startServer() {
  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║   🚀 Manuel Manero API Server Started                      ║
╠════════════════════════════════════════════════════════════╣
║   Environment: ${NODE_ENV.padEnd(43)}║
║   Port: ${String(PORT).padEnd(51)}║
║   Frontend: ${FRONTEND_URL.padEnd(48)}║
╠════════════════════════════════════════════════════════════╣
║   📍 API Root: http://localhost:${PORT}/api/v1${' '.repeat(24)}║
║   🏥 Health: http://localhost:${PORT}/health${' '.repeat(20)}║
║   📊 Leads: http://localhost:${PORT}/api/v1/leads${' '.repeat(14)}║
║   📚 Programs: http://localhost:${PORT}/api/v1/programs${' '.repeat(8)}║
║   📄 Content: http://localhost:${PORT}/api/v1/content${' '.repeat(9)}║
╚════════════════════════════════════════════════════════════╝
`)
    })

    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`)
      } else {
        console.error('❌ Server error:', error)
      }
      process.exit(1)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server')
  await prisma.$disconnect()
  process.exit(0)
})

// Start the server
startServer()

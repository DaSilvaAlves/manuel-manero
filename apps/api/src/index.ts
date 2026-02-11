import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
dotenv.config()

// Initialize Prisma Client
const prisma = new PrismaClient()

// Initialize Express app
const app = express()
const PORT = process.env.API_PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

// API version endpoint
app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Manuel Manero Ecosystem API v1',
    version: '1.0.0',
  })
})

// Routes placeholder
app.get('/api/v1/leads', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })
    res.json({
      status: 'success',
      data: leads,
      count: leads.length,
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch leads'
    })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.path,
  })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  })
})

// Start server
async function startServer() {
  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected')

    // Start Express server
    app.listen(PORT, () => {
      console.log(`
🚀 API Server running at http://localhost:${PORT}
📝 API Documentation available at http://localhost:${PORT}/api/v1
🏥 Health check: http://localhost:${PORT}/health
`)
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

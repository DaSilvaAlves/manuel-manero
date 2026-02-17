import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { programsQuerySchema, parseQueryParams } from '../validation'

const router = Router()
const prisma = new PrismaClient()

/**
 * @route GET /api/programs
 * @desc Get paginated list of programs with optional testimonials
 * @query {number} limit - Results per page (1-100, default: 10)
 * @query {number} offset - Skip N results (default: 0)
 * @query {boolean} published - Only published programs (default: true)
 * @query {boolean} includeTestimonials - Include testimonials (default: true)
 * @returns Programs array with pagination metadata
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Validate query parameters
    let query
    try {
      query = parseQueryParams(programsQuerySchema, req.query)
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: error instanceof Error ? error.message : 'Invalid query parameters',
        timestamp: new Date().toISOString(),
      })
    }

    const { limit = 10, offset = 0, published = true, includeTestimonials = true } = query as any

    // Execute queries in parallel
    const [programs, total] = await Promise.all([
      prisma.program.findMany({
        where: { published },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          price: true,
          currency: true,
          duration: true,
          modules: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          ...(includeTestimonials && {
            testimonials: {
              where: { published: true },
              select: {
                id: true,
                name: true,
                role: true,
                quote: true,
                videoUrl: true,
              },
              take: 3,
            },
          }),
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'asc' },
      }),
      prisma.program.count({ where: { published } }),
    ])

    const response = {
      status: 'success',
      data: {
        programs,
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
    console.error('❌ Error fetching programs:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch programs',
      timestamp: new Date().toISOString(),
    })
  }
})

/**
 * @route GET /api/programs/:slug
 * @desc Get single program by slug with full details
 * @param {string} slug - Program slug (unique identifier)
 * @returns Complete program with all testimonials and details
 */
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params

    // Validate slug format
    if (!slug || typeof slug !== 'string' || slug.length === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid program slug',
        timestamp: new Date().toISOString(),
      })
    }

    const program = await prisma.program.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        longDesc: true,
        price: true,
        currency: true,
        duration: true,
        modules: true,
        modulesDetail: true,
        image: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        testimonials: {
          where: { published: true },
          select: {
            id: true,
            name: true,
            role: true,
            quote: true,
            result: true,
            videoUrl: true,
            image: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!program) {
      return res.status(404).json({
        status: 'error',
        error: 'Program not found',
        data: { slug },
        timestamp: new Date().toISOString(),
      })
    }

    if (!program.published) {
      return res.status(403).json({
        status: 'error',
        error: 'Program is not published',
        timestamp: new Date().toISOString(),
      })
    }

    const response = {
      status: 'success',
      data: program,
      timestamp: new Date().toISOString(),
    }

    res.json(response)
  } catch (error) {
    console.error('❌ Error fetching program:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch program',
      timestamp: new Date().toISOString(),
    })
  }
})

export default router

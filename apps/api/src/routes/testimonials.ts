import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { testimonialsQuerySchema, parseQueryParams } from '../validation'

const router = Router()
const prisma = new PrismaClient()

/**
 * @route GET /api/testimonials
 * @desc Get paginated list of testimonials
 * @query {number} limit - Results per page (1-100, default: 10)
 * @query {number} offset - Skip N results (default: 0)
 * @query {boolean} published - Only published testimonials (default: true)
 * @returns Testimonials array with pagination metadata
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Validate query parameters
    let query
    try {
      query = parseQueryParams(testimonialsQuerySchema, req.query)
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: error instanceof Error ? error.message : 'Invalid query parameters',
        timestamp: new Date().toISOString(),
      })
    }

    const { limit = 10, offset = 0, published = true } = query as any

    // Execute queries in parallel
    const [testimonials, total] = await Promise.all([
      prisma.testimonialVideo.findMany({
        where: { published },
        select: {
          id: true,
          name: true,
          role: true,
          quote: true,
          result: true,
          videoUrl: true,
          image: true,
          createdAt: true,
          programs: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.testimonialVideo.count({ where: { published } }),
    ])

    const response = {
      status: 'success',
      data: {
        testimonials,
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
    console.error('❌ Error fetching testimonials:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch testimonials',
      timestamp: new Date().toISOString(),
    })
  }
})

/**
 * @route GET /api/testimonials/:id
 * @desc Get single testimonial by ID
 * @param {string} id - Testimonial ID
 * @returns Complete testimonial with related programs
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Validate ID format
    if (!id || typeof id !== 'string' || id.length === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid testimonial ID',
        timestamp: new Date().toISOString(),
      })
    }

    const testimonial = await prisma.testimonialVideo.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        role: true,
        quote: true,
        result: true,
        videoUrl: true,
        image: true,
        published: true,
        createdAt: true,
        programs: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          },
        },
      },
    })

    if (!testimonial) {
      return res.status(404).json({
        status: 'error',
        error: 'Testimonial not found',
        data: { id },
        timestamp: new Date().toISOString(),
      })
    }

    if (!testimonial.published) {
      return res.status(403).json({
        status: 'error',
        error: 'Testimonial is not published',
        timestamp: new Date().toISOString(),
      })
    }

    const response = {
      status: 'success',
      data: testimonial,
      timestamp: new Date().toISOString(),
    }

    res.json(response)
  } catch (error) {
    console.error('❌ Error fetching testimonial:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch testimonial',
      timestamp: new Date().toISOString(),
    })
  }
})

export default router

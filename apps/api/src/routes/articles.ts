import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { articlesQuerySchema, parseQueryParams } from '../validation'

const router = Router()
const prisma = new PrismaClient()

/**
 * @route GET /api/articles
 * @desc Get paginated list of articles with optional filtering
 * @query {number} limit - Results per page (1-100, default: 10)
 * @query {number} offset - Skip N results (default: 0)
 * @query {string} category - Filter by category (optional)
 * @query {string} type - Filter by type: blog|video|podcast (optional)
 * @returns Articles array with pagination metadata
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Validate query parameters
    let query
    try {
      query = parseQueryParams(articlesQuerySchema, req.query)
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: error instanceof Error ? error.message : 'Invalid query parameters',
        timestamp: new Date().toISOString(),
      })
    }

    const { limit = 10, offset = 0, category, type, published = true } = query as any

    // Build where clause dynamically
    const where: any = { published }
    if (category) where.category = category
    if (type) where.type = type

    // Execute queries in parallel for performance
    const [articles, total] = await Promise.all([
      prisma.content.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          type: true,
          category: true,
          image: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.content.count({ where }),
    ])

    const response = {
      status: 'success',
      data: {
        articles,
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
    console.error('❌ Error fetching articles:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch articles',
      timestamp: new Date().toISOString(),
    })
  }
})

/**
 * @route GET /api/articles/:slug
 * @desc Get single article by slug with full content
 * @param {string} slug - Article slug (unique identifier)
 * @returns Complete article with SEO metadata
 */
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params

    // Validate slug format (basic validation)
    if (!slug || typeof slug !== 'string' || slug.length === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid slug format',
        timestamp: new Date().toISOString(),
      })
    }

    const article = await prisma.content.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        type: true,
        category: true,
        tags: true,
        image: true,
        videoUrl: true,
        duration: true,
        published: true,
        seoTitle: true,
        seoDesc: true,
        seoKeywords: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!article) {
      return res.status(404).json({
        status: 'error',
        error: 'Article not found',
        data: { slug },
        timestamp: new Date().toISOString(),
      })
    }

    if (!article.published) {
      return res.status(403).json({
        status: 'error',
        error: 'Article is not published',
        timestamp: new Date().toISOString(),
      })
    }

    const response = {
      status: 'success',
      data: article,
      timestamp: new Date().toISOString(),
    }

    res.json(response)
  } catch (error) {
    console.error('❌ Error fetching article:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch article',
      timestamp: new Date().toISOString(),
    })
  }
})

export default router

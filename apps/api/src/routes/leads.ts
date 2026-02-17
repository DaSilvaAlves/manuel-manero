import { Router, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import { PrismaClient } from '@prisma/client'
import { createLeadSchema } from '../validation'
import { addContactToActiveCampaign } from '../services/activecampaign'

const router = Router()
const prisma = new PrismaClient()

/**
 * Rate limit middleware - 10 requests per minute per IP
 * Scoped to this router only, doesn't affect other routes
 */
const leadsRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // 10 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    error: 'Too many requests. Please wait before submitting again.',
    timestamp: new Date().toISOString(),
  },
})

router.use(leadsRateLimit)

/**
 * @route POST /api/leads
 * @desc Capture a new lead with validation and CRM sync
 * @body {string} email - Lead email (required)
 * @body {string} name - Lead name (optional)
 * @body {string} program - Preferred program slug (optional)
 * @body {string} source - Lead source: quiz|newsletter|contact|lead-magnet (default: contact)
 * @body {boolean} gdprConsent - Must be true (required)
 * @returns Created lead data with timestamp
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    // Validate request body
    let validated
    try {
      validated = createLeadSchema.parse(req.body)
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: error instanceof Error ? error.message : 'Invalid request',
        timestamp: new Date().toISOString(),
      })
    }

    // Store lead in database
    const lead = await prisma.lead.create({
      data: {
        email: validated.email,
        name: validated.name || null,
        source: validated.source,
        data: {
          program: validated.program,
          gdprConsent: validated.gdprConsent,
          gdprConsentAt: new Date().toISOString(),
        },
      },
    })

    // Fire-and-forget ActiveCampaign sync (non-blocking)
    // Don't wait for this, log errors separately
    setImmediate(async () => {
      try {
        const [firstName = '', lastName = ''] = (validated.name || '').split(' ')
        await addContactToActiveCampaign(
          {
            email: validated.email,
            firstName: firstName || undefined,
            lastName: lastName || undefined,
          },
          ['lead', validated.source]
        )
      } catch (error) {
        console.error('❌ Background ActiveCampaign sync failed:', error)
      }
    })

    const response = {
      status: 'success',
      data: {
        id: lead.id,
        email: lead.email,
        name: lead.name,
        source: lead.source,
        createdAt: lead.createdAt,
      },
      timestamp: new Date().toISOString(),
    }

    res.status(201).json(response)
  } catch (error) {
    console.error('❌ Error creating lead:', error)
    res.status(500).json({
      status: 'error',
      error: 'Failed to create lead',
      timestamp: new Date().toISOString(),
    })
  }
})

export default router

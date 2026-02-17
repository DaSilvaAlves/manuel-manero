import { z } from 'zod'

/**
 * Common validation schemas for API query parameters
 */

// Pagination parameters - defaults ensure fields are always present
export const paginationSchema = z
  .object({
    limit: z.coerce.number().int().min(1).max(100),
    offset: z.coerce.number().int().min(0),
  })
  .strict()
  .transform((data) => ({
    limit: data.limit ?? 10,
    offset: data.offset ?? 0,
  }))

// Articles query parameters
export const articlesQuerySchema = z
  .object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
    offset: z.coerce.number().int().min(0).optional(),
    category: z.string().optional().describe('Filter by category'),
    type: z.enum(['blog', 'video', 'podcast']).optional().describe('Filter by content type'),
    published: z.coerce.boolean().optional(),
  })
  .strict()
  .transform((data) => ({
    limit: data.limit ?? 10,
    offset: data.offset ?? 0,
    category: data.category,
    type: data.type,
    published: data.published ?? true,
  }))

// Testimonials query parameters
export const testimonialsQuerySchema = z
  .object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
    offset: z.coerce.number().int().min(0).optional(),
    published: z.coerce.boolean().optional(),
  })
  .strict()
  .transform((data) => ({
    limit: data.limit ?? 10,
    offset: data.offset ?? 0,
    published: data.published ?? true,
  }))

// Programs query parameters
export const programsQuerySchema = z
  .object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
    offset: z.coerce.number().int().min(0).optional(),
    published: z.coerce.boolean().optional(),
    includeTestimonials: z.coerce.boolean().optional(),
  })
  .strict()
  .transform((data) => ({
    limit: data.limit ?? 10,
    offset: data.offset ?? 0,
    published: data.published ?? true,
    includeTestimonials: data.includeTestimonials ?? true,
  }))

// Lead creation schema for POST /api/leads
export const createLeadSchema = z.object({
  email: z.string().email({ message: 'Valid email required' }),
  name: z.string().min(1).max(100).optional(),
  program: z.string().optional(),
  source: z.enum(['quiz', 'newsletter', 'contact', 'lead-magnet']).default('contact'),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: 'GDPR consent is required' }),
  }),
})

// Type exports for use in route handlers
export type PaginationQuery = z.infer<typeof paginationSchema>
export type ArticlesQuery = z.infer<typeof articlesQuerySchema>
export type TestimonialsQuery = z.infer<typeof testimonialsQuerySchema>
export type ProgramsQuery = z.infer<typeof programsQuerySchema>
export type CreateLeadInput = z.infer<typeof createLeadSchema>

/**
 * Helper function to validate query parameters with consistent error handling
 * Throws an error if validation fails, returns parsed data if successful
 */
export function parseQueryParams<T>(schema: z.ZodSchema<T>, query: unknown): T {
  try {
    return schema.parse(query)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')
      throw new Error(`Validation error: ${messages}`)
    }
    throw error
  }
}

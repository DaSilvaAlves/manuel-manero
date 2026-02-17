/**
 * API Client Service
 * Comunica com backend Express (localhost:3001)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface LeadData {
  email: string
  name?: string
  program?: string
  source?: string
  gdprConsent: boolean
}

interface ApiResponse<T = any> {
  status: 'success' | 'error'
  data?: T
  error?: string
  timestamp: string
}

export async function submitLead(lead: LeadData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    })

    if (!response.ok) {
      const error = await response.json()
      return {
        status: 'error',
        error: error.error || `HTTP ${response.status}`,
        timestamp: new Date().toISOString(),
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lead submission error:', error)
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }
  }
}

export async function fetchArticles(limit = 10, offset = 0) {
  try {
    const response = await fetch(`${API_URL}/api/articles?limit=${limit}&offset=${offset}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Fetch articles error:', error)
    return { status: 'error', data: [] }
  }
}

export async function fetchPrograms(limit = 10) {
  try {
    const response = await fetch(`${API_URL}/api/programs?limit=${limit}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Fetch programs error:', error)
    return { status: 'error', data: [] }
  }
}

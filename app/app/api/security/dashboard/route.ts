
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-config'
import { SecurityLogger } from '@/lib/security-week2'
import { createSecureApiResponse, createErrorResponse } from '@/lib/security-enhanced'

export const dynamic = "force-dynamic"

// Get security dashboard data
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return createErrorResponse('Unauthorized', 401)
    }

    // Get comprehensive security dashboard data
    const dashboardData = await SecurityLogger.getSecurityDashboardData()

    return createSecureApiResponse({
      dashboard: dashboardData,
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Security dashboard error:', error)
    return createErrorResponse('Failed to load security dashboard', 500)
  }
}


import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-config'
import { redirect } from 'next/navigation'
import SecurityDashboard from './_components/security-dashboard'

export const dynamic = "force-dynamic"

export default async function SecurityPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/admin/login')
  }

  // Check if user has security management permissions
  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
    redirect('/admin')
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor security events, manage API keys, and configure security settings
        </p>
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <SecurityDashboard />
      </Suspense>
    </div>
  )
}

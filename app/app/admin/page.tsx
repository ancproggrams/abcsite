
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ScanResultsTable } from '@/components/admin/scan-results-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getServerSession()

  if (!session || session.user?.role !== 'admin') {
    redirect('/admin/login')
  }

  // Get scan results
  const scanResults = await db.quickScanResult.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Calculate stats
  const totalScans = scanResults.length
  const averageScore = scanResults.length > 0 
    ? Math.round(scanResults.reduce((acc: number, result) => acc + result.totalScore, 0) / scanResults.length)
    : 0
  const recentScans = scanResults.filter((result) => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return result.createdAt >= oneWeekAgo
  }).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Overzicht van Quick Scan resultaten</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Totaal Scans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalScans}</div>
                <p className="text-xs text-muted-foreground">
                  Alle uitgevoerde Quick Scans
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gemiddelde Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore}%</div>
                <p className="text-xs text-muted-foreground">
                  Over alle uitgevoerde scans
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deze Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentScans}</div>
                <p className="text-xs text-muted-foreground">
                  Nieuwe scans afgelopen 7 dagen
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Scan Resultaten</CardTitle>
              <CardDescription>
                Overzicht van alle uitgevoerde Quick Scans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScanResultsTable results={scanResults} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

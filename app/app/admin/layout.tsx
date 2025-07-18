
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  LayoutDashboard, 
  FileText, 
  Download, 
  BookOpen, 
  BarChart3,
  ArrowLeft 
} from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CMS Admin - Advies N Consultancy BV',
  description: 'Content Management System voor Advies N Consultancy BV',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      href: '/admin/blog',
      label: 'Blog Posts',
      icon: FileText
    },
    {
      href: '/admin/downloads',
      label: 'Downloads & Templates',
      icon: Download
    },
    {
      href: '/admin/case-studies',
      label: 'Case Studies',
      icon: BookOpen
    },
    {
      href: '/admin/quickscan-results',
      label: 'QuickScan Resultaten',
      icon: BarChart3
    }
  ]

  return (
    <html lang="nl">
      <body className={inter.className}>
        <div className="min-h-screen bg-muted/20">
          {/* Admin Header */}
          <header className="bg-background border-b">
            <div className="container py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold">CMS Admin</h1>
                  <span className="text-muted-foreground">Advies N Consultancy BV</span>
                </div>
                <Button asChild variant="outline">
                  <Link href="/" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar website
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          <div className="container py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Sidebar Navigation */}
              <div className="col-span-12 md:col-span-3">
                <Card>
                  <CardContent className="p-6">
                    <nav className="space-y-2">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="col-span-12 md:col-span-9">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

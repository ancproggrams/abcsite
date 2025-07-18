'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Download,
  File,
  Eye,
  MoreHorizontal,
  Calendar,
  FileText,
  Users
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'

type DownloadResource = {
  id: string
  title: string
  description: string
  category: string
  type: string
  fileUrl: string
  fileName: string
  fileSize: number | null
  downloadCount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function DownloadsManagementPage() {
  const { data: session } = useSession()
  const [downloads, setDownloads] = useState<DownloadResource[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDownloads()
  }, [])

  const fetchDownloads = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/downloads')
      if (!response.ok) {
        throw new Error('Failed to fetch downloads')
      }
      const data = await response.json()
      setDownloads(data.downloads || [])
    } catch (error) {
      console.error('Error fetching downloads:', error)
      setError('Fout bij het ophalen van downloads')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteDownload = async (downloadId: string) => {
    if (!confirm('Weet je zeker dat je deze download wilt verwijderen?')) {
      return
    }

    try {
      const response = await fetch(`/api/downloads/${downloadId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete download')
      }

      await fetchDownloads()
    } catch (error) {
      console.error('Error deleting download:', error)
      setError('Fout bij het verwijderen van download')
    }
  }

  const handleToggleStatus = async (downloadId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/downloads/${downloadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update download status')
      }

      await fetchDownloads()
    } catch (error) {
      console.error('Error updating download status:', error)
      setError('Fout bij het bijwerken van download status')
    }
  }

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Onbekend'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const categories = [...new Set(downloads.map(d => d.category))]
  
  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = download.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         download.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || download.category === filterCategory
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && download.isActive) ||
                         (filterStatus === 'inactive' && !download.isActive)
    return matchesSearch && matchesCategory && matchesStatus
  })

  const stats = {
    total: downloads.length,
    active: downloads.filter(d => d.isActive).length,
    inactive: downloads.filter(d => !d.isActive).length,
    totalDownloads: downloads.reduce((sum, d) => sum + d.downloadCount, 0)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Downloads Management</h1>
          <p className="text-muted-foreground">
            Beheer downloadable resources en templates
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/downloads/new">
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Download
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <File className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Totaal</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Actief</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-gray-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Inactief</p>
                <p className="text-2xl font-bold">{stats.inactive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Totaal Downloads</p>
                <p className="text-2xl font-bold">{stats.totalDownloads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek downloads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterCategory('all')}
                size="sm"
              >
                Alle categorieën
              </Button>
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={filterCategory === category ? 'default' : 'outline'}
                  onClick={() => setFilterCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Laden...</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titel</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Bestandsgrootte</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDownloads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="text-muted-foreground">
                          {searchTerm ? 'Geen downloads gevonden met deze zoekterm' : 'Nog geen downloads gevonden'}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDownloads.map((download) => (
                      <TableRow key={download.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{download.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {download.description.substring(0, 80)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{download.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <File className="h-4 w-4 mr-2" />
                            {download.type}
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatFileSize(download.fileSize)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            {download.downloadCount}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={download.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {download.isActive ? 'Actief' : 'Inactief'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={download.fileUrl} target="_blank">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Bekijken
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/downloads/edit/${download.id}`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Bewerken
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleToggleStatus(download.id, download.isActive)}>
                                {download.isActive ? (
                                  <>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Deactiveren
                                  </>
                                ) : (
                                  <>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Activeren
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteDownload(download.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Verwijderen
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

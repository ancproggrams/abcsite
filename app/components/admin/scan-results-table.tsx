
'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Eye, Search } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface ScanResult {
  id: string
  email: string
  name: string | null
  company: string | null
  totalScore: number
  maturityLevel: string
  categoryScores: any
  answers: any
  createdAt: Date
  updatedAt: Date
}

interface ScanResultsTableProps {
  results: ScanResult[]
}

export function ScanResultsTable({ results }: ScanResultsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null)

  const filteredResults = results.filter(result =>
    result.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.maturityLevel.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getMaturityColor = (level: string) => {
    switch (level) {
      case 'Optimized': return 'bg-green-500'
      case 'Managed': return 'bg-blue-500'
      case 'Defined': return 'bg-yellow-500'
      case 'Repeatable': return 'bg-orange-500'
      default: return 'bg-red-500'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    if (score >= 20) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Zoek op email, naam of volwassenheidsniveau..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naam</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Volwassenheidsniveau</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">
                  {result.name || 'Geen naam'}
                </TableCell>
                <TableCell>{result.email}</TableCell>
                <TableCell>
                  <span className={`font-semibold ${getScoreColor(result.totalScore)}`}>
                    {Math.round(result.totalScore)}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getMaturityColor(result.maturityLevel)}>
                    {result.maturityLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(result.createdAt), 'dd MMM yyyy HH:mm', { locale: nl })}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedResult(result)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Bekijk
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Quick Scan Resultaten</DialogTitle>
                        <DialogDescription>
                          Gedetailleerde resultaten voor {selectedResult?.name || selectedResult?.email}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedResult && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold">Contactgegevens</h4>
                              <p className="text-sm text-muted-foreground">
                                <strong>Naam:</strong> {selectedResult.name || 'Geen naam'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>Email:</strong> {selectedResult.email}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>Datum:</strong> {format(new Date(selectedResult.createdAt), 'dd MMMM yyyy HH:mm', { locale: nl })}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Totaal Resultaat</h4>
                              <div className="text-3xl font-bold text-primary">
                                {Math.round(selectedResult.totalScore)}%
                              </div>
                              <Badge className={getMaturityColor(selectedResult.maturityLevel)}>
                                {selectedResult.maturityLevel}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-4">Scores per Categorie</h4>
                            <div className="space-y-3">
                              {Object.entries(selectedResult.categoryScores).map(([category, score]: [string, any]) => (
                                <div key={category} className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{category}</span>
                                    <span className="text-primary font-semibold">{score.percentage}%</span>
                                  </div>
                                  <Progress value={score.percentage} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
            {filteredResults.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Geen resultaten gevonden
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

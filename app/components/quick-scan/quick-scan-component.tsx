
'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { ChevronLeft, ChevronRight, Download, Mail, CheckCircle } from 'lucide-react'
import { quickScanQuestions } from '@/lib/quick-scan-questions'

interface Answer {
  questionId: number
  value: string | number
  score: number
}

interface CategoryScore {
  [key: string]: {
    score: number
    maxScore: number
    percentage: number
  }
}

export function QuickScanComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [sendCopyToAdmin, setSendCopyToAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const reportRef = useRef<HTMLDivElement>(null)

  const totalQuestions = quickScanQuestions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleAnswer = (value: string | number) => {
    const question = quickScanQuestions[currentQuestion]
    let score = 0

    if (question.type === 'multiple-choice') {
      const option = question.options?.find(opt => opt.value === value)
      score = option?.score || 0
    } else if (question.type === 'number') {
      const numValue = Number(value)
      const scoring = question.scoring?.find(s => numValue >= s.threshold)
      score = scoring?.score || 0
    }

    const newAnswer: Answer = {
      questionId: question.id,
      value,
      score
    }

    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === question.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = newAnswer
        return updated
      }
      return [...prev, newAnswer]
    })
  }

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === quickScanQuestions[currentQuestion]?.id)
  }

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const completeQuiz = () => {
    setIsCompleted(true)
  }

  const calculateResults = () => {
    const categoryScores: CategoryScore = {}
    let totalScore = 0
    let maxTotalScore = 0

    quickScanQuestions.forEach(question => {
      const answer = answers.find(a => a.questionId === question.id)
      const score = answer?.score || 0
      const maxScore = question.type === 'multiple-choice' 
        ? Math.max(...(question.options?.map(opt => opt.score) || [0]))
        : Math.max(...(question.scoring?.map(s => s.score) || [0]))

      totalScore += score
      maxTotalScore += maxScore

      if (!categoryScores[question.category]) {
        categoryScores[question.category] = {
          score: 0,
          maxScore: 0,
          percentage: 0
        }
      }

      categoryScores[question.category].score += score
      categoryScores[question.category].maxScore += maxScore
    })

    // Calculate percentages
    Object.keys(categoryScores).forEach(category => {
      const cat = categoryScores[category]
      cat.percentage = Math.round((cat.score / cat.maxScore) * 100)
    })

    const totalPercentage = Math.round((totalScore / maxTotalScore) * 100)
    
    // Calculate maturity level from 1 to 5
    let maturityLevelNumber = 1
    let maturityLevelDescription = 'Zeer laag volwassenheidsniveau'
    
    if (totalPercentage >= 81) {
      maturityLevelNumber = 5
      maturityLevelDescription = 'Zeer hoog volwassenheidsniveau'
    } else if (totalPercentage >= 61) {
      maturityLevelNumber = 4
      maturityLevelDescription = 'Hoog volwassenheidsniveau'
    } else if (totalPercentage >= 41) {
      maturityLevelNumber = 3
      maturityLevelDescription = 'Gemiddeld volwassenheidsniveau'
    } else if (totalPercentage >= 21) {
      maturityLevelNumber = 2
      maturityLevelDescription = 'Laag volwassenheidsniveau'
    }

    return {
      totalScore,
      maxTotalScore,
      totalPercentage,
      maturityLevelNumber,
      maturityLevelDescription,
      categoryScores
    }
  }

  const getRecommendations = (results: ReturnType<typeof calculateResults>) => {
    const recommendations = []

    if (results.totalPercentage < 30) {
      recommendations.push('Start met het ontwikkelen van een basis business continuity plan')
      recommendations.push('Implementeer basisprocessen voor risk management')
      recommendations.push('Zorg voor documentatie van kritieke bedrijfsprocessen')
    } else if (results.totalPercentage < 60) {
      recommendations.push('Verbeter incident response procedures')
      recommendations.push('Implementeer regelmatige backup tests')
      recommendations.push('Ontwikkel communicatieplannen voor crisis situaties')
    } else if (results.totalPercentage < 80) {
      recommendations.push('Optimaliseer recovery time objectives (RTO)')
      recommendations.push('Implementeer geautomatiseerde monitoring')
      recommendations.push('Voer regelmatige BCP oefeningen uit')
    } else {
      recommendations.push('Blijf innoveren met nieuwe technologieën')
      recommendations.push('Deel best practices met de industrie')
      recommendations.push('Mentor andere organisaties in BC excellence')
    }

    return recommendations
  }

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return

    setIsLoading(true)
    try {
      const { jsPDF } = await import('jspdf')
      const html2canvas = await import('html2canvas')
      
      const canvas = await html2canvas.default(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      pdf.save('QuickScan-Rapport.pdf')
      
      toast({
        title: 'PDF Downloaded!',
        description: 'Uw rapport is succesvol gedownload.',
      })
    } catch (error) {
      toast({
        title: 'Download Error',
        description: 'Er ging iets mis bij het downloaden van het rapport.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!userEmail || !userName) {
      toast({
        title: 'Ontbrekende gegevens',
        description: 'Vul uw naam en e-mailadres in om het rapport te versturen.',
        variant: 'destructive',
      })
      return
    }

    if (!reportRef.current) return

    setIsLoading(true)
    try {
      const results = calculateResults()
      const recommendations = getRecommendations(results)

      // Send email directly
      const emailResponse = await fetch('/api/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          sendCopyToAdmin,
          results: results,
          recommendations: recommendations
        }),
      })

      if (emailResponse.ok) {
        toast({
          title: 'E-mail verzonden!',
          description: 'Uw rapport is succesvol verstuurd naar uw e-mailadres.',
        })
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      toast({
        title: 'Verzending mislukt',
        description: 'Er ging iets mis bij het versturen van het rapport.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isCompleted) {
    const results = calculateResults()
    const recommendations = getRecommendations(results)

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              <span>Quick Scan Voltooid!</span>
            </CardTitle>
            <CardDescription>
              Hieronder vindt u uw persoonlijke compliance rapport.
            </CardDescription>
          </CardHeader>
        </Card>

        <div ref={reportRef} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uw Compliance Readiness Rapport</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-primary">{results.totalPercentage}%</div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-foreground">
                    Niveau {results.maturityLevelNumber}/5
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {results.maturityLevelDescription}
                  </div>
                </div>
                <Progress value={results.totalPercentage} className="w-full max-w-md mx-auto" />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Scores per Categorie</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(results.categoryScores).map(([category, score]) => (
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

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Persoonlijke Aanbevelingen</h3>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rapport Acties</CardTitle>
            <CardDescription>
              Download of verstuur uw rapport per e-mail.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Naam *</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Uw naam"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail">E-mail *</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="uw@email.nl"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendCopy"
                checked={sendCopyToAdmin}
                onCheckedChange={(checked) => setSendCopyToAdmin(checked as boolean)}
              />
              <Label htmlFor="sendCopy" className="text-sm">
                Ik ga ermee akkoord dat een kopie van dit rapport naar Advies N Consultancy BV wordt gestuurd.
              </Label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDownloadPDF}
                disabled={isLoading}
                className="btn-primary flex-1"
              >
                <Download className="mr-2 h-4 w-4" />
                {isLoading ? 'Bezig...' : 'Download als PDF'}
              </Button>
              <Button
                onClick={handleSendEmail}
                disabled={isLoading || !userEmail || !userName}
                variant="outline"
                className="flex-1"
              >
                <Mail className="mr-2 h-4 w-4" />
                {isLoading ? 'Verzenden...' : 'Verstuur per E-mail'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = quickScanQuestions[currentQuestion]
  const currentAnswer = getCurrentAnswer()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              Vraag {currentQuestion + 1} van {totalQuestions}
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {question?.category}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{question?.text}</h3>
            
            {question?.type === 'multiple-choice' && (
              <RadioGroup
                value={currentAnswer?.value?.toString() || ''}
                onValueChange={(value) => handleAnswer(value)}
              >
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question?.type === 'number' && (
              <div className="space-y-2">
                <Label htmlFor="numberInput">Uw antwoord</Label>
                <Input
                  id="numberInput"
                  type="number"
                  value={currentAnswer?.value?.toString() || ''}
                  onChange={(e) => handleAnswer(Number(e.target.value))}
                  placeholder="Voer een getal in"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Vorige
            </Button>
            <Button
              onClick={nextQuestion}
              disabled={!currentAnswer}
              className="btn-primary"
            >
              {currentQuestion === totalQuestions - 1 ? 'Voltooi Scan' : 'Volgende'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

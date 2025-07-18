

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Shield, BarChart, AlertTriangle, Settings } from 'lucide-react'
import Link from 'next/link'

export default function ComplianceAutomationPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const questions = [
    {
      question: "Heeft uw organisatie een formeel business continuity management systeem?",
      options: [
        { text: "Ja, volledig geïmplementeerd en gecertificeerd", score: 4 },
        { text: "Ja, maar nog niet gecertificeerd", score: 3 },
        { text: "Gedeeltelijk geïmplementeerd", score: 2 },
        { text: "In ontwikkeling", score: 1 },
        { text: "Nee, nog niet gestart", score: 0 }
      ]
    },
    {
      question: "Hoe vaak worden business continuity plannen gereviewed?",
      options: [
        { text: "Elke 6 maanden of bij wijzigingen", score: 4 },
        { text: "Jaarlijks", score: 3 },
        { text: "Om de 2 jaar", score: 2 },
        { text: "Onregelmatig", score: 1 },
        { text: "Nooit", score: 0 }
      ]
    },
    {
      question: "Heeft uw organisatie een disaster recovery plan voor IT-systemen?",
      options: [
        { text: "Ja, volledig getest en up-to-date", score: 4 },
        { text: "Ja, maar niet recent getest", score: 3 },
        { text: "Ja, maar nooit getest", score: 2 },
        { text: "Basis plan", score: 1 },
        { text: "Nee", score: 0 }
      ]
    },
    {
      question: "Wordt er regelmatig risk assessment uitgevoerd?",
      options: [
        { text: "Ja, elke 6 maanden", score: 4 },
        { text: "Ja, jaarlijks", score: 3 },
        { text: "Ja, om de 2 jaar", score: 2 },
        { text: "Onregelmatig", score: 1 },
        { text: "Nooit", score: 0 }
      ]
    },
    {
      question: "Ontvangen medewerkers training over business continuity?",
      options: [
        { text: "Ja, reguliere training voor alle medewerkers", score: 4 },
        { text: "Ja, voor sleutelpersoneel", score: 3 },
        { text: "Ja, eenmalige training", score: 2 },
        { text: "Informele training", score: 1 },
        { text: "Nee", score: 0 }
      ]
    }
  ]

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateResults = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0)
    const maxScore = questions.length * 4
    const percentage = Math.round((totalScore / maxScore) * 100)
    
    let level = "Beginnend"
    let color = "text-red-600"
    if (percentage >= 80) {
      level = "Expert"
      color = "text-green-600"
    } else if (percentage >= 60) {
      level = "Gevorderd"
      color = "text-blue-600"
    } else if (percentage >= 40) {
      level = "Gemiddeld"
      color = "text-yellow-600"
    }

    return { totalScore, maxScore, percentage, level, color }
  }

  const features = [
    {
      icon: Shield,
      title: "Compliance Monitoring",
      description: "Real-time monitoring van uw compliance status met geautomatiseerde alerts en rapportages."
    },
    {
      icon: BarChart,
      title: "Dashboard & Analytics",
      description: "Uitgebreide dashboards met KPI's en trends voor management rapportages."
    },
    {
      icon: AlertTriangle,
      title: "Risk Management",
      description: "Geautomatiseerde risk assessments en incident tracking voor proactief management."
    },
    {
      icon: Settings,
      title: "Process Automation",
      description: "Automatisering van compliance processen voor verhoogde efficiency en nauwkeurigheid."
    }
  ]

  if (!isStarted && !showResults) {
    return (
      <div className="min-h-screen py-12">
        <div className="container max-w-4xl">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Compliance Automation Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automatiseer uw compliance processen en krijg real-time inzicht in uw 
              business continuity status met onze geavanceerde platform.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Scan Section */}
          <div id="quickscan" className="bg-primary text-primary-foreground rounded-lg p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Quick Compliance Scan</h2>
              <p className="text-lg opacity-90">
                Ontdek in 5 minuten waar uw organisatie staat op het gebied van 
                business continuity en compliance. Volledig gratis en direct resultaat.
              </p>
              <div className="grid grid-cols-3 gap-8 my-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm opacity-90">Minuten</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm opacity-90">Vragen</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm opacity-90">Gratis</div>
                </div>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6"
                onClick={() => setIsStarted(true)}
              >
                Start Quick Scan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const results = calculateResults()
    
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="container max-w-3xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Uw Compliance Scan Resultaten</CardTitle>
              <CardDescription>
                Gebaseerd op uw antwoorden hebben wij uw huidige compliance niveau bepaald
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className={`text-6xl font-bold ${results.color}`}>
                  {results.percentage}%
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {results.level}
                  </Badge>
                  <p className="text-muted-foreground">
                    U scoorde {results.totalScore} van de {results.maxScore} punten
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Aanbevelingen</h3>
                <div className="text-left space-y-3">
                  {results.percentage < 40 && (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-800">Prioriteit: Basis implementatie</h4>
                      <p className="text-sm text-red-700">
                        Start met het ontwikkelen van een basis business continuity plan 
                        en implementeer fundamentele risicobeheersing.
                      </p>
                    </div>
                  )}
                  {results.percentage >= 40 && results.percentage < 60 && (
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-yellow-800">Focus: Versterking en formalisering</h4>
                      <p className="text-sm text-yellow-700">
                        Versterk uw bestaande processen en werk toe naar ISO 22301 certificering.
                      </p>
                    </div>
                  )}
                  {results.percentage >= 60 && results.percentage < 80 && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800">Doel: Certificering en optimalisatie</h4>
                      <p className="text-sm text-blue-700">
                        Bereid voor op ISO 22301 audit en optimaliseer uw processen voor maximale effectiviteit.
                      </p>
                    </div>
                  )}
                  {results.percentage >= 80 && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800">Excellentie: Behoud en verbetering</h4>
                      <p className="text-sm text-green-700">
                        Behoud uw hoge niveau en focus op continue verbetering en innovation.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild className="btn-primary flex-1">
                  <Link href="/adviesgesprek">
                    Plan Adviesgesprek
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/diensten">
                    Bekijk Diensten
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Quiz interface
  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
      <div className="container max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">
                Vraag {currentQuestion + 1} van {questions.length}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setIsStarted(false)}>
                Terug
              </Button>
            </div>
            <Progress 
              value={(currentQuestion / questions.length) * 100} 
              className="w-full mb-4"
            />
            <CardTitle className="text-xl">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => handleAnswer(option.score)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground mt-1"></div>
                  <span>{option.text}</span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

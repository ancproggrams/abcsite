
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { QuickScanComponent } from '@/components/quick-scan/quick-scan-component'
import { CheckCircle, Target, TrendingUp, AlertTriangle, Award, Users } from 'lucide-react'
import Link from 'next/link'

export default function ComplianceAutomationPage() {
  const benefits = [
    {
      icon: Target,
      title: 'Gerichte Analyse',
      description: 'Volledige assessment van uw business continuity readiness in 27 strategische vragen.'
    },
    {
      icon: TrendingUp,
      title: 'Volwassenheidscore',
      description: 'Ontdek uw huidige maturity level en krijg duidelijke verbeterdoelen.'
    },
    {
      icon: Award,
      title: 'Persoonlijke Aanbevelingen',
      description: 'Ontvang direct actionable aanbevelingen gebaseerd op uw specifieke situatie.'
    }
  ]

  const problems = [
    {
      icon: AlertTriangle,
      problem: 'Complexe Compliance Vereisten',
      solution: 'Onze Quick Scan vereenvoudigt compliance door complexe frameworks om te zetten in begrijpelijke actiepunten.'
    },
    {
      icon: Users,
      problem: 'Gebrek aan Inzicht',
      solution: 'Krijg volledige transparantie in uw huidige compliance status en weet precies waar u staat.'
    },
    {
      icon: CheckCircle,
      problem: 'Tijdrovende Audits',
      solution: 'Bereid u voor op externe audits met onze geautomatiseerde compliance check.'
    }
  ]

  const faqs = [
    {
      question: 'Hoe lang duurt de Quick Scan?',
      answer: 'De Quick Scan duurt slechts 5-10 minuten. U krijgt direct na afronding uw resultaten.'
    },
    {
      question: 'Wat gebeurt er met mijn gegevens?',
      answer: 'Uw gegevens worden veilig opgeslagen en alleen gebruikt voor het genereren van uw rapport. Wij delen geen gegevens met derden.'
    },
    {
      question: 'Is de Quick Scan echt gratis?',
      answer: 'Ja, de Quick Scan is volledig gratis en zonder verplichtingen. U ontvangt direct een volledig rapport.'
    },
    {
      question: 'Welke frameworks worden gedekt?',
      answer: 'De scan focust op ISO 22301 (Business Continuity), maar behandelt ook aspecten van ISO 27001, GDPR en andere relevante standaarden.'
    },
    {
      question: 'Kan ik het rapport delen met mijn team?',
      answer: 'Absoluut! Het rapport wordt als PDF geleverd die u eenvoudig kunt delen met uw team of management.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Compliance Automation & Quick Scan
              </h1>
              <p className="text-xl text-white/80">
                Ontdek uw compliance readiness in 5 minuten en krijg direct actionable aanbevelingen.
              </p>
            </div>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              <Link href="#quickscan">
                <CheckCircle className="mr-2 h-5 w-5" />
                Start Quick Scan
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Waarom Onze Quick Scan?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Krijg in enkele minuten een compleet overzicht van uw compliance status.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-hover text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 section-background">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Van Probleem naar Oplossing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Wij begrijpen de uitdagingen waar u mee te maken heeft.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {problems.map((item, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <item.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-lg text-red-600">
                      {item.problem}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {item.solution}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Scan Section */}
      <section id="quickscan" className="py-20 bg-background">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Start Uw Quick Scan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Beantwoord 27 strategische vragen en ontvang direct uw persoonlijke compliance rapport.
            </p>
          </div>

          <QuickScanComponent />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 section-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Veelgestelde Vragen
              </h2>
              <p className="text-xl text-muted-foreground">
                Alles wat u wilt weten over onze Quick Scan.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings, Users, Bot, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DienstenPage() {
  const services = [
    {
      icon: Shield,
      title: 'Compliance Pre Audits voor: ISO22301 & ISO27001',
      description: 'Professionele voorbereiding op ISO certificering met grondige assessment en gap analyse.',
      features: ['Gap Analyse', 'Documentatie Review', 'Implementatie Advies', 'Audit Begeleiding'],
      badge: 'Populair'
    },
    {
      icon: Users,
      title: 'IT Consultancy',
      description: 'Strategische adviezen en implementatie van moderne technologieën.',
      features: ['Strategische Planning', 'Roadmap', 'Digitale Transformatie', 'Change Management'],
      badge: 'Populair'
    },
    {
      icon: Bot,
      title: 'AI Outsourcing',
      description: 'Analyseren van bedrijfsprocessen.',
      features: ['Procesanalyse', 'AI Implementatie', 'Kostenoptimalisatie', 'Workflow Automatisering'],
      badge: 'Innovatief'
    }
  ]

  const aiFeatures = [
    {
      icon: Bot,
      title: 'Automatisering',
      description: 'Repetitieve taken automatiseren'
    },
    {
      icon: Shield,
      title: 'Compliance',
      description: 'Geautomatiseerde compliance monitoring en rapportage'
    },
    {
      icon: Clock,
      title: 'Efficiëntie',
      description: 'Tot 70% tijdsbesparing op routinematige processen'
    }
  ]

  const faqs = [
    {
      question: 'Hoe snel kunnen jullie opstarten?',
      answer: 'Wij kunnen binnen 48 uur na ondertekening van het contract beginnen met de implementatie van onze diensten.'
    },
    {
      question: 'Bieden jullie ook ondersteuning buiten kantooruren?',
      answer: 'Ja, onze Managed Services omvatten 24/7 monitoring en support. Voor consultancy diensten bieden we flexibele uren aan.'
    },
    {
      question: 'Welke compliance frameworks ondersteunen jullie?',
      answer: 'Wij hebben expertise in ISO 22301, ISO 27001, GDPR, SOC 2, en NIST frameworks.'
    },
    {
      question: 'Kunnen jullie ook met bestaande IT-leveranciers samenwerken?',
      answer: 'Absoluut. Wij werken graag samen met uw bestaande leveranciers om een naadloze service te waarborgen.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 section-background rounded-xl mx-4 md:mx-6 mt-4">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Onze Diensten
              </h1>
              <p className="text-xl text-muted-foreground">
                Van managed services tot strategische consultancy, wij bieden de complete IT-oplossing voor uw bedrijf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-background rounded-lg mx-4 md:mx-6 my-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-hover relative">
                {service.badge && (
                  <Badge className="absolute top-4 right-4 bg-primary">
                    {service.badge}
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full btn-primary">
                    <Link href="/adviesgesprek">
                      Meer Informatie
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Outsourcing Section */}
      <section className="py-20 section-background rounded-lg mx-4 md:mx-6 my-6">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                AI Outsourcing - De Toekomst van Efficiency
              </h2>
              <p className="text-xl text-muted-foreground">
                Transformeer uw bedrijfsprocessen met onze automatiserings oplossingen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="card-hover text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 rounded-xl">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    Waarom AI Outsourcing?
                  </h3>
                  <p className="text-muted-foreground">
                    Onze AI-oplossingen automatiseren repetitieve taken, verbeteren de accuratesse en besparen kostbare tijd. 
                    Van documentverwerking tot compliance monitoring, wij maken uw processen slimmer.
                  </p>
                  <div className="flex justify-center">
                    <Button asChild className="btn-primary">
                      <Link href="/adviesgesprek">
                        Meer Informatie
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background rounded-lg mx-4 md:mx-6 my-6">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Veelgestelde Vragen
              </h2>
              <p className="text-xl text-muted-foreground">
                Antwoorden op de meest gestelde vragen over onze diensten.
              </p>
            </div>

            <div className="bg-card/50 rounded-xl p-6">
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
        </div>
      </section>
    </div>
  )
}


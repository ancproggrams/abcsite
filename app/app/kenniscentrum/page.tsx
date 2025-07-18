

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Download, Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Kenniscentrum - IT & Compliance Resources',
  description: 'Toegang tot waardevolle resources, whitepapers, case studies en best practices voor business continuiteit en compliance.',
}

export default function KenniscentrumPage() {
  const featuredArticles = [
    {
      title: 'ISO 22301 Implementatiegids 2024',
      excerpt: 'Een complete gids voor het implementeren van ISO 22301 business continuity management in uw organisatie.',
      category: 'Guide',
      readTime: '15 min',
      date: '15 maart 2024',
      featured: true
    },
    {
      title: 'NIS2 Richtlijn: Impact op Nederlandse Bedrijven',
      excerpt: 'Alles wat u moet weten over de nieuwe NIS2 richtlijn en de gevolgen voor uw cybersecurity strategie.',
      category: 'Compliance',
      readTime: '10 min',
      date: '8 maart 2024',
      featured: true
    },
    {
      title: 'Business Continuity in de Cloud Era',
      excerpt: 'Hoe cloud technologie uw business continuity strategie kan versterken en nieuwe uitdagingen brengt.',
      category: 'Technology',
      readTime: '12 min',
      date: '1 maart 2024',
      featured: false
    }
  ]

  const resources = [
    {
      title: 'ISO 22301 Checklist',
      description: 'Complete checklist voor ISO 22301 compliance assessment',
      type: 'PDF Download',
      category: 'Checklist'
    },
    {
      title: 'Business Impact Analysis Template',
      description: 'Kant-en-klare template voor het uitvoeren van een BIA',
      type: 'Excel Template',
      category: 'Template'
    },
    {
      title: 'Incident Response Playbook',
      description: 'Stap-voor-stap gids voor effectieve incident response',
      type: 'PDF Guide',
      category: 'Guide'
    },
    {
      title: 'Compliance Dashboard Template',
      description: 'Dashboard template voor het monitoren van compliance status',
      type: 'PowerBI Template',
      category: 'Template'
    }
  ]

  const caseStudies = [
    {
      title: 'Healthcare Organisatie: ISO 22301 Certificering',
      industry: 'Healthcare',
      challenge: 'Implementatie van BCMS voor 24/7 patiëntenzorg',
      result: '99.9% uptime, succesvolle ISO 22301 certificering',
      duration: '8 maanden'
    },
    {
      title: 'Financiële Instelling: NIS2 Compliance',
      industry: 'Financial Services',
      challenge: 'Voldoen aan nieuwe NIS2 eisen voor cybersecurity',
      result: 'Volledige compliance, 40% reductie in security incidents',
      duration: '6 maanden'
    },
    {
      title: 'Manufacturing: Business Continuity Transformatie',
      industry: 'Manufacturing',
      challenge: 'Minimaliseren van productie downtime',
      result: '75% reductie in downtime, kostenbesparing €2M per jaar',
      duration: '12 maanden'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Kenniscentrum
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ontdek waardevolle inzichten, best practices en praktische resources voor 
            business continuiteit, compliance en IT-transformatie.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Uitgelichte Artikelen</h2>
            <Button variant="outline" size="sm">
              Bekijk Alle Artikelen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <Card key={index} className={`card-hover ${article.featured ? 'border-primary' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={article.featured ? 'default' : 'secondary'}>
                      {article.category}
                    </Badge>
                    {article.featured && <Badge variant="outline">Featured</Badge>}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Lees Meer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Downloads & Templates</h2>
            <Button variant="outline" size="sm">
              Alle Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <Download className="h-5 w-5 text-primary" />
                        <Badge variant="secondary">{resource.category}</Badge>
                      </div>
                      <h3 className="font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <p className="text-xs text-muted-foreground">{resource.type}</p>
                    </div>
                    <Button size="sm" className="ml-4">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Case Studies</h2>
            <p className="text-xl text-muted-foreground">
              Ontdek hoe wij organisaties hebben geholpen hun doelen te bereiken
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{study.industry}</Badge>
                    <span className="text-sm text-muted-foreground">{study.duration}</span>
                  </div>
                  <CardTitle className="text-lg">{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Uitdaging:</h4>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Resultaat:</h4>
                      <p className="text-sm text-muted-foreground">{study.result}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Lees Case Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Blijf op de hoogte</h2>
            <p className="text-lg opacity-90">
              Ontvang maandelijks de nieuwste inzichten, tips en resources over 
              business continuiteit en compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Uw e-mailadres"
                className="flex-1 px-4 py-2 rounded-md text-foreground"
              />
              <Button variant="secondary">
                Aanmelden
              </Button>
            </div>
            <p className="text-sm opacity-75">
              Geen spam, altijd uitschrijfbaar. Zie onze privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

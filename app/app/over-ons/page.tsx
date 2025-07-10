
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Target, Users, Award, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function OverOnsPage() {
  const values = [
    {
      icon: Target,
      title: 'Expertise',
      description: 'Diepgaande kennis van compliance frameworks en moderne IT-infrastructuur'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Wij geloven in langdurige partnerschappen en werken als verlengstuk van uw team'
    },
    {
      icon: Award,
      title: 'Kwaliteit',
      description: 'Hoogste standaarden in service delivery en compliance implementatie'
    },
    {
      icon: TrendingUp,
      title: 'Innovatie',
      description: 'Voortdurende verbetering en adoptie van nieuwe technologieën'
    }
  ]

  const stats = [
    { number: '50+', label: 'Tevreden Klanten' },
    { number: '98%', label: 'Uptime Garantie' },
    { number: '24/7', label: 'Support' },
    { number: '5+', label: 'Jaar Ervaring' }
  ]

  const certifications = [
    'ISO 22301 Certified',
    'ISO 27001 Expert',
    'GDPR Specialist',
    'SOC 2 Implementation',
    'NIST Framework',
    'Microsoft Partner'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient rounded-xl mx-4 md:mx-6 mt-4">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Over Advies N Consultancy BV
              </h1>
              <p className="text-xl text-white/80">
                Uw betrouwbare partner voor IT-consultancy, compliance en business continuïteit sinds 2019.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background rounded-lg mx-4 md:mx-6 my-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Onze Missie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  Wij helpen organisaties hun IT-infrastructuur te transformeren en te beveiligen door middel van 
                  strategische consultancy, compliance automation en AI-gedreven oplossingen. Ons doel is om 
                  bedrijven weerbaar te maken tegen moderne digitale uitdagingen.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Onze Visie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  Wij streven naar een toekomst waarin elke organisatie over een robuuste, compliant en 
                  toekomstbestendige IT-infrastructuur beschikt. Door innovatie en expertise te combineren, 
                  maken wij dit mogelijk voor bedrijven van elke grootte.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 section-background rounded-lg mx-4 md:mx-6 my-6">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Onze Kernwaarden
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deze waarden vormen de basis van alles wat wij doen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-hover text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background rounded-lg mx-4 md:mx-6 my-6">
        <div className="container">
          <div className="bg-card/30 rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 section-background rounded-lg mx-4 md:mx-6 my-6">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Onze Expertise
              </h2>
              <p className="text-xl text-muted-foreground">
                Gecertificeerd en gespecialiseerd in verschillende compliance frameworks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="flex items-center space-x-3 p-4">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">{cert}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background rounded-lg mx-4 md:mx-6 my-6">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ons Team
              </h2>
              <p className="text-xl text-muted-foreground">
                Een ervaren team van IT-consultants en compliance specialisten.
              </p>
            </div>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Marc van der Berg</h3>
                    <p className="text-lg text-primary">Founder & Lead Consultant</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Marc heeft meer dan 15 jaar ervaring in IT-consultancy en compliance. Als gecertificeerd 
                      ISO 22301 en ISO 27001 expert helpt hij organisaties hun business continuïteit te verbeteren.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="secondary">ISO 22301 Lead Auditor</Badge>
                      <Badge variant="secondary">ISO 27001 Expert</Badge>
                      <Badge variant="secondary">GDPR Specialist</Badge>
                      <Badge variant="secondary">Microsoft MVP</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 section-background rounded-lg mx-4 md:mx-6 my-6">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Klaar om samen te werken?
              </h2>
              <p className="text-xl text-muted-foreground">
                Ontdek hoe wij uw organisatie kunnen helpen groeien en compliant te blijven.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-6">
                <Link href="/compliance-automation#quickscan">
                  Start Quick Scan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                <Link href="/adviesgesprek">
                  Plan Gesprek
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

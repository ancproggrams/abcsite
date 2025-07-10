
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Clock, Server, FileText } from 'lucide-react'

export function SpecializationSection() {
  const specializations = [
    {
      icon: Shield,
      title: 'ISO 22301 Compliance',
      description: 'Implementatie en onderhoud van business continuïteit managementsystemen volgens internationale standaarden.',
    },
    {
      icon: Clock,
      title: 'Minimaliseer Downtime',
      description: 'Proactieve monitoring en snelle respons om bedrijfskritische systemen optimaal te houden.',
    },
    {
      icon: Server,
      title: 'IT Continuïteit',
      description: 'Robuuste infrastructuur en back-up strategieën voor ononderbroken bedrijfsvoering.',
    },
    {
      icon: FileText,
      title: 'Geautomatiseerde Documentatie',
      description: 'AI-gedreven documentatie en rapportage voor compliance en auditdoeleinden.',
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Onze Specialisaties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wij bieden gespecialiseerde IT-consultancy diensten die uw bedrijf helpen groeien en voldoen aan alle compliance eisen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specializations.map((spec, index) => (
            <Card key={index} className="card-hover">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <spec.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{spec.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {spec.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

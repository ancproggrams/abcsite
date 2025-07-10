
import { ContactForm } from '@/components/forms/contact-form'
import { MicrosoftBookingsEmbed } from '@/components/microsoft-bookings-embed'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function AdviesGesprekPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Plan Uw Adviesgesprek
              </h1>
              <p className="text-xl text-white/80">
                Bespreek uw IT-uitdagingen met onze experts. Gratis, zonder verplichtingen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Telefoon</h3>
                <p className="text-sm text-muted-foreground">+31 (0) 20 123 4567</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-sm text-muted-foreground">info@adviesnconsultancy.nl</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Locatie</h3>
                <p className="text-sm text-muted-foreground">Amsterdam, Nederland</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Responstijd</h3>
                <p className="text-sm text-muted-foreground">Binnen 2 uur</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 section-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Stuur ons een bericht
                </h2>
                <p className="text-lg text-muted-foreground">
                  Vul het formulier in en wij nemen binnen 2 uur contact met u op.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Right Column - Microsoft Bookings */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Plan direct een afspraak
                </h2>
                <p className="text-lg text-muted-foreground">
                  Kies een tijdstip dat u uitkomt voor een persoonlijk gesprek.
                </p>
              </div>
              <MicrosoftBookingsEmbed />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Wat kunt u verwachten?
              </h2>
              <p className="text-xl text-muted-foreground">
                Ons adviesgesprek is gratis en zonder verplichtingen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-hover text-center">
                <CardHeader>
                  <CardTitle className="text-lg">1. Kennismaking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Wij leren uw bedrijf kennen en begrijpen uw specifieke IT-uitdagingen.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="card-hover text-center">
                <CardHeader>
                  <CardTitle className="text-lg">2. Analyse</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Samen analyseren wij uw huidige situatie en identificeren verbeterpunten.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="card-hover text-center">
                <CardHeader>
                  <CardTitle className="text-lg">3. Advies</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    U ontvangt concrete aanbevelingen en een roadmap voor verbetering.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

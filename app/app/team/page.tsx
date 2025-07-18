
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Award, 
  Users, 
  Calendar,
  MapPin
} from 'lucide-react'
import Image from 'next/image'

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Marc René",
      position: "Senior BCM Consultant & Eigenaar",
      bio: "Marc heeft meer dan 15 jaar ervaring in business continuity management en compliance. Hij is gecertificeerd ISO 22301 Lead Auditor en heeft talloze organisaties geholpen met het implementeren van robuuste BCM systemen.",
      imageUrl: "https://i.pinimg.com/originals/cd/26/7d/cd267d9afa3343b50c468b3daec610bc.jpg",
      email: "marc@adviesnconsultancy.nl",
      phone: "+31 6 22675520",
      linkedinUrl: "https://linkedin.com/in/marcrene",
      expertise: ["ISO 22301", "BCM Implementation", "Crisis Management", "Risk Assessment", "Compliance Auditing"],
      certifications: ["ISO 22301 Lead Auditor", "CBCP", "CISA"]
    },
    {
      name: "Sarah van der Berg",
      position: "BCM Consultant",
      bio: "Sarah is gespecialiseerd in BCM voor de financiële sector en heeft uitgebreide ervaring met regulatory compliance. Ze helpt organisaties bij het navigeren door complexe compliance vereisten.",
      imageUrl: "https://usercontent.one/wp/haltung-zeigen.com/wp-content/uploads/fsqm-files/IAUFcTLR43LtGzBwSarahBuddeberg_190412_0558_Presse_KLEIN.jpg",
      email: "sarah@adviesnconsultancy.nl",
      phone: "+31 6 12345678",
      linkedinUrl: "https://linkedin.com/in/sarahvdberg",
      expertise: ["Financial Services BCM", "Regulatory Compliance", "Risk Management", "DORA Implementation"],
      certifications: ["ISO 22301 Lead Implementer", "CBCP", "FRM"]
    },
    {
      name: "Thomas Jansen",
      position: "IT Security & BCM Specialist",
      bio: "Thomas combineert zijn expertise in cybersecurity met business continuity management. Hij helpt organisaties bij het integreren van IT security en BCM voor een holistische aanpak.",
      imageUrl: "https://blog.ai-headshots.net/wp-content/uploads/2024/05/professional-acting-headshots.png",
      email: "thomas@adviesnconsultancy.nl",
      phone: "+31 6 87654321",
      linkedinUrl: "https://linkedin.com/in/thomasjansen",
      expertise: ["Cybersecurity", "IT Risk Management", "Incident Response", "Recovery Planning"],
      certifications: ["CISSP", "CISM", "ISO 27001 Lead Auditor"]
    },
    {
      name: "Linda Smit",
      position: "Training & Development Specialist",
      bio: "Linda ontwikkelt en verzorgt BCM training programma's voor organisaties. Ze heeft een achtergrond in adult learning en zorgt ervoor dat teams effectief worden opgeleid in BCM principes.",
      imageUrl: "https://lfcdypol.elementor.cloud/wp-content/uploads/2023/10/McDonald_Linda_5377868_SM.jpg",
      email: "linda@adviesnconsultancy.nl",
      phone: "+31 6 11223344",
      linkedinUrl: "https://linkedin.com/in/lindasmit",
      expertise: ["BCM Training", "Workshop Development", "Crisis Simulation", "Team Development"],
      certifications: ["CBCP", "Certified Professional Trainer", "ISO 22301 Foundation"]
    }
  ]

  const companyStats = [
    { label: "Jaar ervaring", value: "15+", icon: Award },
    { label: "Tevreden klanten", value: "200+", icon: Users },
    { label: "Voltooide projecten", value: "500+", icon: Calendar },
    { label: "Landen", value: "5", icon: MapPin }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Ons Expert Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ontmoet onze ervaren consultants die u helpen bij het implementeren van effectieve business continuity oplossingen.
        </p>
      </div>

      {/* Company Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {companyStats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {teamMembers.map((member, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  
                  {/* Contact Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="hidden sm:inline">Email</span>
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="hidden sm:inline">Bel</span>
                    </a>
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Expertise */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">Expertise</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.expertise.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <h4 className="font-medium mb-3">Certificeringen</h4>
                <div className="flex flex-wrap gap-2">
                  {member.certifications.map((cert, certIndex) => (
                    <Badge key={certIndex} className="text-xs bg-blue-100 text-blue-700">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Company Culture */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle>Onze Werkwijze</CardTitle>
          <CardDescription>
            Wat ons onderscheidt als BCM consultancy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Klantgericht</h3>
              <p className="text-sm text-muted-foreground">
                Wij stellen uw specifieke behoeften en uitdagingen centraal in elke fase van het project.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Expertise</h3>
              <p className="text-sm text-muted-foreground">
                Onze consultants hebben jarenlange ervaring en zijn gecertificeerd in de nieuwste BCM standaarden.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Pragmatisch</h3>
              <p className="text-sm text-muted-foreground">
                Wij leveren praktische, implementeerbare oplossingen die direct waarde toevoegen aan uw organisatie.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Klaar om te beginnen?
            </h3>
            <p className="text-muted-foreground mb-6">
              Neem contact op met ons team voor een vrijblijvend adviesgesprek over uw BCM uitdagingen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/adviesgesprek">
                  Plan een gesprek
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:info@adviesnconsultancy.nl">
                  Email ons
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

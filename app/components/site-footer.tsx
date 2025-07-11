'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

export function SiteFooter() {
  const { t } = useTranslation()

  // Safe translation function with guaranteed fallback
  const safeT = (key: string, fallback: string) => {
    try {
      return t(key, fallback) || fallback
    } catch {
      return fallback
    }
  }

  return (
    <footer className="bg-muted/50 border-t theme-transition">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-8 w-8">
                <Image
                  src="/ANCLOGO.jpeg"
                  alt="Advies N Consultancy BV Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-foreground">{safeT('footer.company', 'Advies N Consultancy BV')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {safeT('footer.description', 'Professionele IT-consultancy en compliance experts')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{safeT('contact.info.email', 'info@adviesnconsultancy.nl')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{safeT('contact.info.phone', '+31 (0)70 123 4567')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{safeT('contact.info.address', 'Voorburg, Nederland')}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{safeT('footer.links.services', 'Diensten')}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/diensten" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {safeT('services.it.title', 'IT Consultancy')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/compliance-automation" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {safeT('services.compliance.title', 'Compliance Automation')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/diensten" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {safeT('services.ai.title', 'AI Outsourcing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{safeT('footer.links.about', 'Over ons')}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/over-ons" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {safeT('nav.about', 'Over Ons')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/adviesgesprek" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {safeT('footer.links.contact', 'Contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/compliance-automation#quickscan" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {safeT('nav.quickscan', 'Quick Scan')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 {safeT('footer.company', 'Advies N Consultancy BV')}. {safeT('footer.rights', 'Alle rechten voorbehouden')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

export function SiteFooter() {
  const { t } = useTranslation()

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
              <span className="font-semibold text-foreground">{t('footer.company')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{t('contact.info.email')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{t('contact.info.phone')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{t('contact.info.address')}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.links.services')}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/diensten" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {t('services.it.title')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/compliance-automation" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {t('services.compliance.title')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/diensten" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {t('services.ai.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('footer.links.about')}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/over-ons" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/adviesgesprek" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible"
                >
                  {t('footer.links.contact')}
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
                  {t('nav.quickscan')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 {t('footer.company')}. {t('footer.rights')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}



'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTranslation } from '@/lib/i18n'

// Static navigation configuration to ensure consistent SSR/CSR rendering
const navigationItems = [
  {
    key: 'home',
    href: '/',
    translationKey: 'nav.home',
    fallback: 'Home'
  },
  {
    key: 'services',
    href: '/diensten',
    translationKey: 'nav.services',
    fallback: 'Diensten'
  },
  {
    key: 'knowledge',
    href: '/kenniscentrum',
    translationKey: 'nav.knowledge',
    fallback: 'Kenniscentrum'
  },
  {
    key: 'compliance',
    href: '/compliance-automation',
    translationKey: 'nav.compliance',
    fallback: 'Compliance Automation'
  },
  {
    key: 'about',
    href: '/over-ons',
    translationKey: 'nav.about',
    fallback: 'Over Ons'
  },
  {
    key: 'consultation',
    href: '/adviesgesprek',
    translationKey: 'nav.consultation',
    fallback: 'Adviesgesprek'
  }
] as const

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Safe translation function with guaranteed fallback
  const safeT = (key: string, fallback: string) => {
    try {
      return t(key, fallback) || fallback
    } catch {
      return fallback
    }
  }

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link focus-visible"
        tabIndex={1}
      >
        {safeT('a11y.skipToContent', 'Skip to main content')}
      </a>
      
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 theme-transition">
        <div className="container flex h-20 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-3 focus-visible interactive-element"
            aria-label="Advies N Consultancy BV - Go to homepage"
          >
            <div className="relative h-12 w-12">
              <Image
                src="/ANCLOGO.jpeg"
                alt="Advies N Consultancy BV Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Advies N Consultancy BV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link 
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
              >
                {safeT(item.translationKey, item.fallback)}
              </Link>
            ))}
            
            {/* Theme and Language toggles */}
            <div className="flex items-center space-x-2 ml-4">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            
            <Button asChild className="btn-primary focus-visible interactive-element ml-2">
              <Link href="/compliance-automation#quickscan">
                {safeT('nav.quickscan', 'Quick Scan')}
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
            <button
              className="mobile-menu-btn focus-visible interactive-element"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? safeT('a11y.closeMenu', 'Close menu') : safeT('a11y.openMenu', 'Open menu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden bg-background border-t theme-transition"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="container py-4 space-y-4">
              {navigationItems.map((item) => (
                <Link 
                  key={item.key}
                  href={item.href}
                  className="block text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
                  onClick={toggleMenu}
                >
                  {safeT(item.translationKey, item.fallback)}
                </Link>
              ))}
              <Button 
                asChild 
                className="btn-primary w-full focus-visible interactive-element" 
                onClick={toggleMenu}
              >
                <Link href="/compliance-automation#quickscan">
                  {safeT('nav.quickscan', 'Quick Scan')}
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

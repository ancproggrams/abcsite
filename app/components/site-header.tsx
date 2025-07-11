
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTranslation } from '@/lib/i18n'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link focus-visible"
        tabIndex={1}
      >
        {t('a11y.skipToContent', 'Skip to main content')}
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
            <Link 
              href="/" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
            >
              {t('nav.home')}
            </Link>
            <Link 
              href="/diensten" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
            >
              {t('nav.services')}
            </Link>
            <Link 
              href="/kenniscentrum" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
            >
              {t('nav.knowledge', 'Kenniscentrum')}
            </Link>
            <Link 
              href="/compliance-automation" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
            >
              {t('nav.compliance')}
            </Link>
            <Link 
              href="/over-ons" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
            >
              {t('nav.about')}
            </Link>
            <Link 
              href="/adviesgesprek" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
            >
              {t('nav.consultation')}
            </Link>
            
            {/* Theme and Language toggles */}
            <div className="flex items-center space-x-2 ml-4">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            
            <Button asChild className="btn-primary focus-visible interactive-element ml-2">
              <Link href="/compliance-automation#quickscan">
                {t('nav.quickscan')}
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
              aria-label={isMenuOpen ? t('a11y.closeMenu', 'Close menu') : t('a11y.openMenu', 'Open menu')}
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
              <Link 
                href="/" 
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
                onClick={toggleMenu}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href="/diensten" 
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
                onClick={toggleMenu}
              >
                {t('nav.services')}
              </Link>
              <Link 
                href="/kenniscentrum" 
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
                onClick={toggleMenu}
              >
                {t('nav.knowledge', 'Kenniscentrum')}
              </Link>
              <Link 
                href="/compliance-automation" 
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
                onClick={toggleMenu}
              >
                {t('nav.compliance')}
              </Link>
              <Link 
                href="/over-ons" 
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
                onClick={toggleMenu}
              >
                {t('nav.about')}
              </Link>
              <Link 
                href="/adviesgesprek" 
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible interactive-element"
                onClick={toggleMenu}
              >
                {t('nav.consultation')}
              </Link>
              <Button 
                asChild 
                className="btn-primary w-full focus-visible interactive-element" 
                onClick={toggleMenu}
              >
                <Link href="/compliance-automation#quickscan">
                  {t('nav.quickscan')}
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

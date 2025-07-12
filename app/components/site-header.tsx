
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

// Static navigation configuration - SSR-only version
const navigationItems = [
  { key: 'home', href: '/', label: 'Home' },
  { key: 'services', href: '/diensten', label: 'Diensten' },
  { key: 'knowledge', href: '/kenniscentrum', label: 'Kenniscentrum' },
  { key: 'compliance', href: '/compliance-automation', label: 'Compliance Automation' },
  { key: 'about', href: '/over-ons', label: 'Over Ons' },
  { key: 'consultation', href: '/adviesgesprek', label: 'Adviesgesprek' }
] as const

export function SiteHeader() {
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link focus-visible"
        tabIndex={1}
      >
        Skip to main content
      </a>
      
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-3 focus-visible"
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
                className="text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible"
              >
                {item.label}
              </Link>
            ))}
            
            <Button asChild className="btn-primary focus-visible ml-4">
              <Link href="/compliance-automation#quickscan">
                Quick Scan
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation - simplified for SSR */}
          <div className="md:hidden">
            <Button asChild className="btn-primary focus-visible">
              <Link href="/compliance-automation#quickscan">
                Quick Scan
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}

// ORIGINAL CLIENT VERSION - COMMENTED OUT FOR TESTING
// 'use client'
// 
// import { useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { Menu, X } from 'lucide-react'
// import { LanguageToggle } from '@/components/language-toggle'
// import { ThemeToggle } from '@/components/theme-toggle'
// import { useTranslation } from '@/lib/i18n'

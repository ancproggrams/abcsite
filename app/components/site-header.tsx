
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative h-12 w-12">
            <Image
              src="/ANCLOGO.jpeg"
              alt="Advies N Consultancy BV Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-semibold text-foreground">
            Advies N Consultancy BV
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/diensten" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Diensten
          </Link>
          <Link href="/compliance-automation" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Compliance Automation
          </Link>
          <Link href="/over-ons" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Over Ons
          </Link>
          <Link href="/adviesgesprek" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Adviesgesprek
          </Link>
          <Button asChild className="btn-primary">
            <Link href="/compliance-automation#quickscan">
              Quick Scan
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="container py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="/diensten" 
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Diensten
            </Link>
            <Link 
              href="/compliance-automation" 
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Compliance Automation
            </Link>
            <Link 
              href="/over-ons" 
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Over Ons
            </Link>
            <Link 
              href="/adviesgesprek" 
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Adviesgesprek
            </Link>
            <Button asChild className="btn-primary w-full" onClick={toggleMenu}>
              <Link href="/compliance-automation#quickscan">
                Quick Scan
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

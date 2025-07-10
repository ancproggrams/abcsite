
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Uw Strategische Partner in{' '}
              <span className="text-white/90">IT & Compliance</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              Transformeer uw bedrijf met AI-gedreven IT-continuïteit, compliance automation en strategische consultancy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              <Link href="/compliance-automation#quickscan">
                <CheckCircle className="mr-2 h-5 w-5" />
                Start Quick Scan
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6">
              <Link href="/adviesgesprek">
                Plan Adviesgesprek
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-white/70">Uptime Garantie</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-white/70">Monitoring</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-white">ISO 22301</div>
              <div className="text-white/70">Compliance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

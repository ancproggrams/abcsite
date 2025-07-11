
'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import { AnalyticsProvider } from '@/components/analytics-provider'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <div suppressHydrationWarning={true}>
      <LanguageProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme-preference"
        >
          {children}
        </ThemeProvider>
      </LanguageProvider>
    </div>
  )
}

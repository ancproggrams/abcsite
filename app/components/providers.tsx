
'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
        storageKey="theme-preference"
      >
        {children}
      </ThemeProvider>
    </LanguageProvider>
  )
}

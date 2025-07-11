
'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Language, LanguageContext, translations } from '@/lib/i18n'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('nl')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    if (savedLanguage && (savedLanguage === 'nl' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('preferred-language', lang)
    document.documentElement.lang = lang
  }

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] || translations.nl[key] || fallback || key
  }

  const contextValue = { language, setLanguage, t }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

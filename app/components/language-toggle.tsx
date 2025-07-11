
'use client'

import { useLanguage } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0"
          aria-label={t('a11y.toggleLanguage', 'Change language')}
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t('a11y.toggleLanguage', 'Change language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => setLanguage('nl')}
          className={`cursor-pointer ${language === 'nl' ? 'bg-accent' : ''}`}
        >
          <span className="mr-2">🇳🇱</span>
          <span>Nederlands</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`cursor-pointer ${language === 'en' ? 'bg-accent' : ''}`}
        >
          <span className="mr-2">🇬🇧</span>
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

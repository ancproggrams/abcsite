
export interface QuickScanQuestion {
  id: number
  text: string
  type: 'multiple-choice' | 'number'
  category: string
  options?: {
    text: string
    value: string
    score: number
  }[]
  scoring?: {
    threshold: number
    score: number
  }[]
}

export const quickScanQuestions: QuickScanQuestion[] = [
  // Organisatie (8 vragen)
  {
    id: 1,
    text: 'Heeft uw organisatie een formeel business continuity management systeem?',
    type: 'multiple-choice',
    category: 'Organisatie',
    options: [
      { text: 'Ja, volledig geïmplementeerd en gecertificeerd', value: 'fully_implemented', score: 4 },
      { text: 'Ja, maar nog niet gecertificeerd', value: 'implemented', score: 3 },
      { text: 'Gedeeltelijk geïmplementeerd', value: 'partially', score: 2 },
      { text: 'In ontwikkeling', value: 'developing', score: 1 },
      { text: 'Nee, nog niet gestart', value: 'not_started', score: 0 }
    ]
  },
  {
    id: 2,
    text: 'Heeft uw organisatie een business continuity beleid?',
    type: 'multiple-choice',
    category: 'Organisatie',
    options: [
      { text: 'Ja, goedgekeurd door management en regelmatig gereviewed', value: 'approved_reviewed', score: 4 },
      { text: 'Ja, goedgekeurd door management', value: 'approved', score: 3 },
      { text: 'Ja, maar nog niet goedgekeurd', value: 'draft', score: 2 },
      { text: 'In ontwikkeling', value: 'developing', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 3,
    text: 'Zijn er duidelijke rollen en verantwoordelijkheden gedefinieerd voor business continuity?',
    type: 'multiple-choice',
    category: 'Organisatie',
    options: [
      { text: 'Ja, volledig gedefinieerd en getraind', value: 'fully_defined', score: 4 },
      { text: 'Ja, gedefinieerd maar training is beperkt', value: 'defined_limited', score: 3 },
      { text: 'Gedeeltelijk gedefinieerd', value: 'partially', score: 2 },
      { text: 'Informeel gedefinieerd', value: 'informal', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 4,
    text: 'Hoe vaak worden business continuity plannen gereviewed?',
    type: 'multiple-choice',
    category: 'Organisatie',
    options: [
      { text: 'Elke 6 maanden of bij wijzigingen', value: 'every_6_months', score: 4 },
      { text: 'Jaarlijks', value: 'annually', score: 3 },
      { text: 'Om de 2 jaar', value: 'biannually', score: 2 },
      { text: 'Onregelmatig', value: 'irregular', score: 1 },
      { text: 'Nooit', value: 'never', score: 0 }
    ]
  },
  {
    id: 5,
    text: 'Heeft uw organisatie een crisis management team?',
    type: 'multiple-choice',
    category: 'Organisatie',
    options: [
      { text: 'Ja, volledig operationeel met regelmatige training', value: 'fully_operational', score: 4 },
      { text: 'Ja, maar beperkte training', value: 'limited_training', score: 3 },
      { text: 'Ja, maar niet getraind', value: 'not_trained', score: 2 },
      { text: 'Informeel team', value: 'informal', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 6,
    text: 'Hoeveel werkdagen per jaar besteedt u aan business continuity activiteiten?',
    type: 'number',
    category: 'Organisatie',
    scoring: [
      { threshold: 20, score: 4 },
      { threshold: 10, score: 3 },
      { threshold: 5, score: 2 },
      { threshold: 1, score: 1 },
      { threshold: 0, score: 0 }
    ]
  },
  {
    id: 7,
    text: 'Heeft uw organisatie een communicatieplan voor crisis situaties?',
    type: 'multiple-choice',
    category: 'Organisatie',
    options: [
      { text: 'Ja, volledig uitgewerkt en getest', value: 'fully_tested', score: 4 },
      { text: 'Ja, volledig uitgewerkt maar niet getest', value: 'not_tested', score: 3 },
      { text: 'Gedeeltelijk uitgewerkt', value: 'partially', score: 2 },
      { text: 'Basis communicatieplan', value: 'basic', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 8,
    text: 'Wordt business continuity meegenomen in nieuwe projecten?',
    type: 'multiple-choice',
    category: 'Organisatie',
    options: [
      { text: 'Ja, altijd vanaf het begin', value: 'always', score: 4 },
      { text: 'Ja, meestal', value: 'usually', score: 3 },
      { text: 'Soms', value: 'sometimes', score: 2 },
      { text: 'Zelden', value: 'rarely', score: 1 },
      { text: 'Nooit', value: 'never', score: 0 }
    ]
  },

  // Risk Management (6 vragen)
  {
    id: 9,
    text: 'Heeft uw organisatie een formele business impact analyse (BIA) uitgevoerd?',
    type: 'multiple-choice',
    category: 'Risk Management',
    options: [
      { text: 'Ja, recent uitgevoerd en regelmatig geüpdatet', value: 'recent_updated', score: 4 },
      { text: 'Ja, recent uitgevoerd', value: 'recent', score: 3 },
      { text: 'Ja, maar meer dan 2 jaar geleden', value: 'outdated', score: 2 },
      { text: 'Informele analyse', value: 'informal', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 10,
    text: 'Zijn kritieke bedrijfsprocessen geïdentificeerd en gedocumenteerd?',
    type: 'multiple-choice',
    category: 'Risk Management',
    options: [
      { text: 'Ja, volledig geïdentificeerd en up-to-date', value: 'fully_current', score: 4 },
      { text: 'Ja, volledig geïdentificeerd maar niet recent geüpdatet', value: 'fully_outdated', score: 3 },
      { text: 'Gedeeltelijk geïdentificeerd', value: 'partially', score: 2 },
      { text: 'Informeel geïdentificeerd', value: 'informal', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 11,
    text: 'Hoeveel kritieke bedrijfsprocessen heeft uw organisatie geïdentificeerd?',
    type: 'number',
    category: 'Risk Management',
    scoring: [
      { threshold: 20, score: 4 },
      { threshold: 10, score: 3 },
      { threshold: 5, score: 2 },
      { threshold: 1, score: 1 },
      { threshold: 0, score: 0 }
    ]
  },
  {
    id: 12,
    text: 'Zijn recovery time objectives (RTO) gedefinieerd voor kritieke processen?',
    type: 'multiple-choice',
    category: 'Risk Management',
    options: [
      { text: 'Ja, voor alle kritieke processen', value: 'all_processes', score: 4 },
      { text: 'Ja, voor de meeste processen', value: 'most_processes', score: 3 },
      { text: 'Ja, voor enkele processen', value: 'some_processes', score: 2 },
      { text: 'Informeel gedefinieerd', value: 'informal', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 13,
    text: 'Wordt er regelmatig risk assessment uitgevoerd?',
    type: 'multiple-choice',
    category: 'Risk Management',
    options: [
      { text: 'Ja, elke 6 maanden', value: 'every_6_months', score: 4 },
      { text: 'Ja, jaarlijks', value: 'annually', score: 3 },
      { text: 'Ja, om de 2 jaar', value: 'biannually', score: 2 },
      { text: 'Onregelmatig', value: 'irregular', score: 1 },
      { text: 'Nooit', value: 'never', score: 0 }
    ]
  },
  {
    id: 14,
    text: 'Heeft uw organisatie een leveranciers continuity plan?',
    type: 'multiple-choice',
    category: 'Risk Management',
    options: [
      { text: 'Ja, volledig uitgewerkt en getest', value: 'fully_tested', score: 4 },
      { text: 'Ja, volledig uitgewerkt maar niet getest', value: 'not_tested', score: 3 },
      { text: 'Gedeeltelijk uitgewerkt', value: 'partially', score: 2 },
      { text: 'Basis plan', value: 'basic', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },

  // Techniek (7 vragen)
  {
    id: 15,
    text: 'Heeft uw organisatie een disaster recovery plan voor IT-systemen?',
    type: 'multiple-choice',
    category: 'Techniek',
    options: [
      { text: 'Ja, volledig getest en up-to-date', value: 'fully_tested', score: 4 },
      { text: 'Ja, maar niet recent getest', value: 'not_recent', score: 3 },
      { text: 'Ja, maar nooit getest', value: 'never_tested', score: 2 },
      { text: 'Basis plan', value: 'basic', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 16,
    text: 'Hoe vaak worden backups getest?',
    type: 'multiple-choice',
    category: 'Techniek',
    options: [
      { text: 'Wekelijks', value: 'weekly', score: 4 },
      { text: 'Maandelijks', value: 'monthly', score: 3 },
      { text: 'Per kwartaal', value: 'quarterly', score: 2 },
      { text: 'Jaarlijks', value: 'annually', score: 1 },
      { text: 'Nooit', value: 'never', score: 0 }
    ]
  },
  {
    id: 17,
    text: 'Hoeveel procent van uw IT-systemen wordt gemonitord?',
    type: 'number',
    category: 'Techniek',
    scoring: [
      { threshold: 90, score: 4 },
      { threshold: 75, score: 3 },
      { threshold: 50, score: 2 },
      { threshold: 25, score: 1 },
      { threshold: 0, score: 0 }
    ]
  },
  {
    id: 18,
    text: 'Heeft uw organisatie een alternatieve werklocatie?',
    type: 'multiple-choice',
    category: 'Techniek',
    options: [
      { text: 'Ja, volledig ingericht en getest', value: 'fully_tested', score: 4 },
      { text: 'Ja, volledig ingericht maar niet getest', value: 'not_tested', score: 3 },
      { text: 'Ja, maar beperkt ingericht', value: 'limited', score: 2 },
      { text: 'Informele afspraak', value: 'informal', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 19,
    text: 'Wordt er regelmatig penetration testing uitgevoerd?',
    type: 'multiple-choice',
    category: 'Techniek',
    options: [
      { text: 'Ja, elke 6 maanden', value: 'every_6_months', score: 4 },
      { text: 'Ja, jaarlijks', value: 'annually', score: 3 },
      { text: 'Ja, om de 2 jaar', value: 'biannually', score: 2 },
      { text: 'Onregelmatig', value: 'irregular', score: 1 },
      { text: 'Nooit', value: 'never', score: 0 }
    ]
  },
  {
    id: 20,
    text: 'Hoeveel minuten is uw gemiddelde system recovery time?',
    type: 'number',
    category: 'Techniek',
    scoring: [
      { threshold: 0, score: 4 },
      { threshold: 30, score: 3 },
      { threshold: 60, score: 2 },
      { threshold: 240, score: 1 },
      { threshold: 1440, score: 0 }
    ]
  },
  {
    id: 21,
    text: 'Heeft uw organisatie een cybersecurity incident response plan?',
    type: 'multiple-choice',
    category: 'Techniek',
    options: [
      { text: 'Ja, volledig getest en up-to-date', value: 'fully_tested', score: 4 },
      { text: 'Ja, maar niet recent getest', value: 'not_recent', score: 3 },
      { text: 'Ja, maar nooit getest', value: 'never_tested', score: 2 },
      { text: 'Basis plan', value: 'basic', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },

  // Training & Awareness (3 vragen)
  {
    id: 22,
    text: 'Hoe vaak worden business continuity oefeningen uitgevoerd?',
    type: 'multiple-choice',
    category: 'Training & Awareness',
    options: [
      { text: 'Elke 6 maanden', value: 'every_6_months', score: 4 },
      { text: 'Jaarlijks', value: 'annually', score: 3 },
      { text: 'Om de 2 jaar', value: 'biannually', score: 2 },
      { text: 'Onregelmatig', value: 'irregular', score: 1 },
      { text: 'Nooit', value: 'never', score: 0 }
    ]
  },
  {
    id: 23,
    text: 'Ontvangen medewerkers training over business continuity?',
    type: 'multiple-choice',
    category: 'Training & Awareness',
    options: [
      { text: 'Ja, reguliere training voor alle medewerkers', value: 'all_regular', score: 4 },
      { text: 'Ja, voor sleutelpersoneel', value: 'key_personnel', score: 3 },
      { text: 'Ja, eenmalige training', value: 'one_time', score: 2 },
      { text: 'Informele training', value: 'informal', score: 1 },
      { text: 'Nee', value: 'no', score: 0 }
    ]
  },
  {
    id: 24,
    text: 'Hoeveel procent van uw medewerkers is bewust van business continuity procedures?',
    type: 'number',
    category: 'Training & Awareness',
    scoring: [
      { threshold: 90, score: 4 },
      { threshold: 75, score: 3 },
      { threshold: 50, score: 2 },
      { threshold: 25, score: 1 },
      { threshold: 0, score: 0 }
    ]
  },

  // Monitoring & Verbetering (3 vragen)
  {
    id: 25,
    text: 'Wordt de effectiviteit van business continuity plannen gemeten?',
    type: 'multiple-choice',
    category: 'Monitoring & Verbetering',
    options: [
      { text: 'Ja, met KPIs en regelmatige rapportage', value: 'kpis_reporting', score: 4 },
      { text: 'Ja, maar informeel', value: 'informal', score: 3 },
      { text: 'Soms', value: 'sometimes', score: 2 },
      { text: 'Zelden', value: 'rarely', score: 1 },
      { text: 'Nooit', value: 'never', score: 0 }
    ]
  },
  {
    id: 26,
    text: 'Worden lessons learned na incidenten gedocumenteerd?',
    type: 'multiple-choice',
    category: 'Monitoring & Verbetering',
    options: [
      { text: 'Ja, altijd met follow-up acties', value: 'always_followup', score: 4 },
      { text: 'Ja, meestal', value: 'usually', score: 3 },
      { text: 'Soms', value: 'sometimes', score: 2 },
      { text: 'Zelden', value: 'rarely', score: 1 },
      { text: 'Nooit', value: 'never', score: 0 }
    ]
  },
  {
    id: 27,
    text: 'Hoeveel verbeterinitiatieven zijn het afgelopen jaar geïmplementeerd?',
    type: 'number',
    category: 'Monitoring & Verbetering',
    scoring: [
      { threshold: 10, score: 4 },
      { threshold: 5, score: 3 },
      { threshold: 3, score: 2 },
      { threshold: 1, score: 1 },
      { threshold: 0, score: 0 }
    ]
  }
]

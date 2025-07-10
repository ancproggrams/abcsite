// Type definitions for the application

export interface QuickScanAnswer {
  questionId: number
  value: string | number
  score: number
}

export interface CategoryScore {
  score: number
  maxScore: number
  percentage: number
}

export interface QuickScanResults {
  totalScore: number
  maxTotalScore: number
  totalPercentage: number
  maturityLevel: string
  categoryScores: { [key: string]: CategoryScore }
}
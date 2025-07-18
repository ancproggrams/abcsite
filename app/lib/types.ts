

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

// Blog/CMS Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  authorName: string
  authorEmail: string
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  categories: BlogCategory[]
  tags: BlogTag[]
  viewCount: number
  shareCount: number
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  createdAt: Date
  posts?: BlogPost[]
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  createdAt: Date
  posts?: BlogPost[]
}

export interface CreateBlogPostData {
  title: string
  content: string
  excerpt: string
  featuredImage?: string
  categories: string[]
  tags: string[]
  status?: 'DRAFT' | 'PUBLISHED'
  metaTitle?: string
  metaDescription?: string
  keywords?: string
}

export interface BlogSearchParams {
  query?: string
  category?: string
  tag?: string
  status?: string
  page?: number
  limit?: number
}

// Newsletter Types
export interface NewsletterSubscriber {
  id: string
  email: string
  name: string | null
  company: string | null
  isActive: boolean
  preferences: string[]
  source: string | null
  leadScore: number
  lastEngagement: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface NewsletterSignupData {
  email: string
  name?: string
  company?: string
  preferences: string[]
  source?: string
}

export interface NewsletterCampaign {
  id: string
  subject: string
  content: string
  template: string
  scheduledFor?: Date
  sentAt?: Date
  recipientCount: number
  openRate: number
  clickRate: number
}

// Social Media Types
export interface SocialMediaPost {
  id: string
  platform: 'LINKEDIN' | 'TWITTER' | 'FACEBOOK'
  postId: string
  content: string
  url: string
  imageUrl?: string
  publishedAt: Date
  engagements: number
  createdAt: Date
}

export interface SocialShareData {
  url: string
  title: string
  description: string
  image?: string
}

// Lead Generation Types
export interface LeadSource {
  blog: number
  newsletter: number
  social: number
  quickScan: number
  contact: number
}

export interface MarketingMetrics {
  blogViews: number
  newsletterSubscribers: number
  socialShares: number
  leadConversions: number
  engagementRate: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

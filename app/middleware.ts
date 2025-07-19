

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Rate limiting store (in-memory for demo, use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Security utilities
function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>'"]/g, '')
}

function checkRateLimit(ip: string, limit: number = 100, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const current = rateLimitMap.get(ip)
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (current.count >= limit) {
    return false
  }
  
  current.count += 1
  return true
}

function isValidUserAgent(userAgent: string): boolean {
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nessus/i,
    /masscan/i,
    /nmap/i,
    /dirb/i,
    /dirbuster/i,
    /gobuster/i,
    /wfuzz/i,
    /burp/i,
    /metasploit/i
  ]
  
  return !suspiciousPatterns.some(pattern => pattern.test(userAgent))
}

export async function middleware(request: NextRequest) {
  // Enhanced security checks
  const ip = request.ip || request.headers.get('X-Forwarded-For') || request.headers.get('X-Real-IP') || 'unknown'
  const userAgent = request.headers.get('User-Agent') || 'unknown'
  const origin = request.headers.get('Origin')
  const referer = request.headers.get('Referer')

  // Block suspicious user agents
  if (!isValidUserAgent(userAgent)) {
    console.warn(`🚫 Blocked suspicious user agent: ${userAgent} from IP: ${ip}`)
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Enhanced rate limiting
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/')
  const rateLimit = isApiRoute ? 60 : 100 // Lower limit for API routes
  const rateLimitWindow = isApiRoute ? 5 * 60 * 1000 : 15 * 60 * 1000 // 5 min for API, 15 min for general

  if (!checkRateLimit(ip, rateLimit, rateLimitWindow)) {
    console.warn(`🚫 Rate limit exceeded for IP: ${ip}`)
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '900',
        'X-RateLimit-Limit': rateLimit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': Math.floor((Date.now() + rateLimitWindow) / 1000).toString()
      }
    })
  }

  // HTTPS redirect (production only)
  if (process.env.NODE_ENV === 'production' && 
      !request.url.startsWith('https://') && 
      !request.headers.get('x-forwarded-proto')?.includes('https')) {
    const httpsUrl = request.url.replace(/^http:/, 'https:')
    return NextResponse.redirect(httpsUrl, 301)
  }

  // Get the response
  const response = NextResponse.next()

  // Check if this is an admin route (but not login page)
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth')

  // Protect admin routes
  if (isAdminRoute && !isLoginPage && !isAuthRoute) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    if (!token || !token.isActive) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check if user is actually an admin
    if (!token.role || !['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(token.role as string)) {
      // Redirect to login page with error
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('error', 'insufficient_permissions')
      return NextResponse.redirect(loginUrl)
    }
  }

  // If already authenticated and trying to access login page, redirect to dashboard
  if (isLoginPage) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    if (token && token.isActive) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Check if this is a preview environment
  const hostname = request.headers.get('host') || ''
  const isPreview = hostname.includes('.preview.abacusai.app') || 
                   hostname.includes('localhost') || 
                   hostname.includes('127.0.0.1') ||
                   process.env.NODE_ENV === 'development'

  // For preview environments, use minimal security headers to avoid blocking
  if (isPreview) {
    console.log('🔄 Preview environment detected:', hostname)
    
    // Completely disable frame restrictions for preview
    response.headers.delete('X-Frame-Options')
    
    // Allow all permissions
    response.headers.set('Permissions-Policy', 'camera=*, microphone=*, geolocation=*')
    
    // Minimal CSP that allows everything
    response.headers.set('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; frame-ancestors *;")
    
    // Skip other security headers for preview
    return response
  }

  // Enhanced security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  
  // Enhanced Permissions Policy
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
    'ambient-light-sensor=()',
    'autoplay=()',
    'encrypted-media=()',
    'fullscreen=(self)',
    'picture-in-picture=()'
  ]
  response.headers.set('Permissions-Policy', permissionsPolicy.join(', '))
  
  // Enhanced HSTS for production
  if (request.url.startsWith('https://') || request.headers.get('x-forwarded-proto') === 'https') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }
  
  // Enhanced CSP for production security
  const nonce = Buffer.from(Math.random().toString()).toString('base64').slice(0, 16)
  
  const cspPolicy = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apps.abacus.ai https://cdn.jsdelivr.net https://unpkg.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net`,
    `font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:`,
    `img-src 'self' data: https: blob: https://airespo.com/wp-content/uploads/2024/12/Abacus-AI-featured-image.jpg https://images.unsplash.com`,
    `connect-src 'self' https: wss: https://apps.abacus.ai`,
    `frame-src 'self' https://outlook.live.com https://outlook.office365.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'self'`,
    `media-src 'self' data: blob:`,
    `worker-src 'self' blob:`,
    `manifest-src 'self'`,
    "upgrade-insecure-requests"
  ]
  
  response.headers.set('Content-Security-Policy', cspPolicy.join('; '))
  
  // Performance and Caching Headers
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  } else if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|ico|svg|webp|woff|woff2|ttf|eot)$/)) {
    // Static assets - long cache
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (request.nextUrl.pathname.match(/\.(js|css)$/)) {
    // JS/CSS files - medium cache
    response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400')
  }
  
  // Rate limiting headers (basic implementation)
  // ip and userAgent already declared above
  
  // Block common bot patterns
  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawl/i,
    /scraper/i,
    /scanner/i,
    /wget/i,
    /curl/i,
  ]
  
  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    // Allow legitimate bots but with rate limiting
    if (!userAgent.includes('Googlebot') && !userAgent.includes('Bingbot') && !userAgent.includes('LinkedInBot')) {
      response.headers.set('X-RateLimit-Limit', '10')
      response.headers.set('X-RateLimit-Remaining', '9')
      response.headers.set('X-RateLimit-Reset', `${Math.floor(Date.now() / 1000) + 3600}`)
    }
  }
  
  // Enhanced security headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('X-API-Version', '1.0')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    // Remove server identification
    response.headers.delete('X-Powered-By')
    response.headers.delete('Server')
    
    // CORS security for API routes
    const allowedOrigins = [
      'https://abcadviesnconsultancy.com',
      'https://www.abcadviesnconsultancy.com',
      'http://localhost:3000',
      'https://localhost:3000'
    ]
    
    const origin = request.headers.get('Origin')
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
    
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    response.headers.set('Access-Control-Max-Age', '86400')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }
  
  // Add security logging
  if (process.env.NODE_ENV === 'production') {
    console.log(`🛡️ Security middleware processed: ${request.method} ${request.nextUrl.pathname} from ${ip}`)
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

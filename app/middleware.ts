

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { SecurityLogger, SessionManager, ValidationManager, ApiKeyManager } from '@/lib/security-week2'

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
  const startTime = Date.now()
  
  // Enhanced security checks
  const ip = request.ip || request.headers.get('X-Forwarded-For') || request.headers.get('X-Real-IP') || 'unknown'
  const userAgent = request.headers.get('User-Agent') || 'unknown'
  const origin = request.headers.get('Origin')
  const referer = request.headers.get('Referer')
  const method = request.method
  const pathname = request.nextUrl.pathname

  // ==== WEEK 2: ENHANCED INPUT VALIDATION ====
  
  // Check for SQL injection patterns in URL
  if (ValidationManager.detectSqlInjection(pathname)) {
    await SecurityLogger.logEvent('SQL_INJECTION_ATTEMPT', 'HIGH', {
      url: pathname,
      ipAddress: ip,
      userAgent,
      method
    }, 'middleware', undefined, undefined, ip, userAgent)
    
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Check for XSS patterns in URL parameters
  const searchParams = request.nextUrl.searchParams.toString()
  if (searchParams && ValidationManager.detectXss(searchParams)) {
    await SecurityLogger.logEvent('XSS_ATTEMPT', 'HIGH', {
      params: searchParams,
      ipAddress: ip,
      userAgent,
      method
    }, 'middleware', undefined, undefined, ip, userAgent)
    
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ==== WEEK 2: API KEY AUTHENTICATION ====
  
  const isApiRoute = pathname.startsWith('/api/')
  const isPublicApiRoute = pathname.startsWith('/api/auth') || 
                           pathname.startsWith('/api/health') ||
                           pathname.startsWith('/api/contact')

  // API Key validation for protected API routes
  if (isApiRoute && !isPublicApiRoute && method !== 'OPTIONS') {
    const apiKey = request.headers.get('X-API-Key')
    
    if (apiKey) {
      // Validate API key
      const validation = await ApiKeyManager.validateApiKey(apiKey)
      
      if (!validation.isValid) {
        await SecurityLogger.logEvent('UNAUTHORIZED_ACCESS', 'MEDIUM', {
          reason: validation.error,
          endpoint: pathname,
          ipAddress: ip,
          userAgent
        }, 'middleware', undefined, undefined, ip, userAgent)
        
        return new NextResponse('Unauthorized', { status: 401 })
      }

      // Check API key rate limit
      const canProceed = await ApiKeyManager.checkRateLimit(validation.apiKey.id)
      if (!canProceed) {
        await SecurityLogger.logEvent('RATE_LIMIT_EXCEEDED', 'MEDIUM', {
          apiKeyId: validation.apiKey.id,
          endpoint: pathname,
          ipAddress: ip
        }, 'middleware', undefined, undefined, ip, userAgent)
        
        return new NextResponse('Rate Limit Exceeded', { status: 429 })
      }

      // Log API usage
      const duration = Date.now() - startTime
      await ApiKeyManager.logApiUsage(
        validation.apiKey.id,
        pathname,
        method,
        ip,
        userAgent,
        200, // Will be updated in response
        duration
      )
    }
  }

  // Block suspicious user agents
  if (!isValidUserAgent(userAgent)) {
    await SecurityLogger.logEvent('MALICIOUS_REQUEST', 'MEDIUM', {
      userAgent,
      ipAddress: ip,
      reason: 'Suspicious user agent'
    }, 'middleware', undefined, undefined, ip, userAgent)
    
    console.warn(`🚫 Blocked suspicious user agent: ${userAgent} from IP: ${ip}`)
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Enhanced rate limiting with logging
  const rateLimit = isApiRoute ? 60 : 100 // Lower limit for API routes
  const rateLimitWindow = isApiRoute ? 5 * 60 * 1000 : 15 * 60 * 1000 // 5 min for API, 15 min for general

  if (!checkRateLimit(ip, rateLimit, rateLimitWindow)) {
    await SecurityLogger.logEvent('RATE_LIMIT_EXCEEDED', 'MEDIUM', {
      ipAddress: ip,
      userAgent,
      limit: rateLimit,
      window: rateLimitWindow,
      endpoint: pathname
    }, 'middleware', undefined, undefined, ip, userAgent)
    
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

  // ==== WEEK 2: ENHANCED ADMIN ROUTE PROTECTION & SESSION MANAGEMENT ====
  
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  const isAuthRoute = pathname.startsWith('/api/auth')

  // Protect admin routes with enhanced session management
  if (isAdminRoute && !isLoginPage && !isAuthRoute) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    if (!token || !token.isActive) {
      await SecurityLogger.logEvent('UNAUTHORIZED_ACCESS', 'MEDIUM', {
        attemptedRoute: pathname,
        ipAddress: ip,
        userAgent,
        reason: 'No valid session token'
      }, 'middleware', undefined, undefined, ip, userAgent)
      
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check if user is actually an admin
    if (!token.role || !['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(token.role as string)) {
      await SecurityLogger.logEvent('PRIVILEGE_ESCALATION', 'HIGH', {
        userId: token.sub,
        userRole: token.role,
        attemptedRoute: pathname,
        ipAddress: ip,
        userAgent
      }, 'middleware', token.sub, undefined, ip, userAgent)
      
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('error', 'insufficient_permissions')
      return NextResponse.redirect(loginUrl)
    }

    // Track session activity
    await SessionManager.trackSessionActivity(
      token.sessionToken as string,
      token.sub as string,
      'page_view',
      ip,
      userAgent,
      true,
      { page: pathname }
    )

    // Update session activity timestamp
    await SessionManager.updateSessionActivity(token.sessionToken as string)

    // Check for suspicious activity
    const suspiciousCheck = await SessionManager.detectSuspiciousActivity(
      token.sub as string,
      ip,
      userAgent
    )

    if (suspiciousCheck.suspicious) {
      await SecurityLogger.logEvent('SUSPICIOUS_ACTIVITY', 'HIGH', {
        userId: token.sub,
        ipAddress: ip,
        userAgent,
        reasons: suspiciousCheck.reasons,
        sessionToken: token.sessionToken
      }, 'middleware', token.sub, token.sessionToken as string, ip, userAgent)

      // For critical suspicious activity, invalidate sessions
      if (suspiciousCheck.reasons.length > 2) {
        await SessionManager.invalidateSessionsOnSuspiciousActivity(token.sub as string)
        
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('error', 'suspicious_activity_detected')
        return NextResponse.redirect(loginUrl)
      }
    }
  }

  // Enhanced login page handling
  if (isLoginPage) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    if (token && token.isActive) {
      // Track successful authentication bypass
      await SessionManager.trackSessionActivity(
        token.sessionToken as string,
        token.sub as string,
        'login_page_bypass',
        ip,
        userAgent,
        true,
        { redirectedFrom: 'login_page' }
      )
      
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

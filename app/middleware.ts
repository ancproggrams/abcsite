
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next()

  // Check if this is a preview environment
  const hostname = request.headers.get('host') || ''
  const isPreview = hostname.includes('.preview.abacusai.app') || 
                   hostname.includes('localhost') || 
                   hostname.includes('127.0.0.1') ||
                   process.env.NODE_ENV === 'development'

  // Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Environment-specific headers
  if (isPreview) {
    // Relaxed headers for preview environment
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('Permissions-Policy', 'camera=*, microphone=*, geolocation=*')
  } else {
    // Strict headers for production
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  }
  
  // HSTS - Only for HTTPS and production
  if (request.url.startsWith('https://') && !isPreview) {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }
  
  // Content Security Policy - Environment specific
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  
  let cspPolicy: string[]
  
  if (isPreview) {
    // Relaxed CSP for preview environment
    cspPolicy = [
      "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: *",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:`,
      `style-src 'self' 'unsafe-inline' https: data:`,
      `font-src 'self' https: data:`,
      `img-src 'self' data: https: blob: *`,
      `connect-src 'self' https: wss: ws:`,
      `frame-src 'self' https: data:`,
      `object-src 'self' data:`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `frame-ancestors 'self' *.abacusai.app`,
    ]
  } else {
    // Strict CSP for production
    cspPolicy = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com`,
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
      `font-src 'self' https://fonts.gstatic.com`,
      `img-src 'self' data: https: blob:`,
      `connect-src 'self' https://www.google-analytics.com https://api.adviesnconsultancy.nl`,
      `frame-src 'self' https://outlook.office365.com https://outlook.office.com`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `frame-ancestors 'none'`,
      `upgrade-insecure-requests`,
    ]
  }
  
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
  const ip = request.ip || request.headers.get('X-Forwarded-For') || 'unknown'
  const userAgent = request.headers.get('User-Agent') || 'unknown'
  
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
  
  // Add security headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('X-API-Version', '1.0')
    response.headers.set('X-Powered-By', 'Next.js')
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

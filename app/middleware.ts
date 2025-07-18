

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
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

  // Production security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // HSTS - Softened configuration to avoid SSL/TLS issues
  if (request.url.startsWith('https://')) {
    // Reduced max-age and removed preload to avoid SSL conflicts
    response.headers.set('Strict-Transport-Security', 'max-age=3600')
  }
  
  // Relaxed CSP for production to avoid SSL/TLS conflicts
  const cspPolicy = [
    "default-src 'self' https:",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https: data:`,
    `style-src 'self' 'unsafe-inline' https: data:`,
    `font-src 'self' https: data:`,
    `img-src 'self' data: https: blob:`,
    `connect-src 'self' https: wss: ws:`,
    `frame-src 'self' https:`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self' https:`,
    `frame-ancestors 'self'`,
    // Removed upgrade-insecure-requests to avoid SSL protocol conflicts
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

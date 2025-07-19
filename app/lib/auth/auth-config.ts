
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Find admin user
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email }
          })

          if (!admin) {
            return null
          }

          // Check if account is active
          if (!admin.isActive) {
            return null
          }

          // Check for lockout
          if (admin.lockoutUntil && admin.lockoutUntil > new Date()) {
            return null
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.hashedPassword
          )

          if (!isPasswordValid) {
            // Increment failed login attempts
            await prisma.admin.update({
              where: { id: admin.id },
              data: {
                failedLogins: admin.failedLogins + 1,
                lockoutUntil: admin.failedLogins >= 4 ? new Date(Date.now() + 15 * 60 * 1000) : null // 15 minutes lockout after 5 failed attempts
              }
            })
            return null
          }

          // Reset failed login attempts and update last login
          await prisma.admin.update({
            where: { id: admin.id },
            data: {
              failedLogins: 0,
              lockoutUntil: null,
              lastLogin: new Date()
            }
          })

          // Log admin activity
          await prisma.adminActivityLog.create({
            data: {
              adminId: admin.id,
              action: 'LOGIN',
              resource: 'AUTH',
              details: { success: true }
            }
          })

          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            isActive: admin.isActive
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours (reduced from 24)
    updateAge: 30 * 60, // Update session every 30 minutes
  },
  jwt: {
    maxAge: 8 * 60 * 60, // 8 hours (reduced from 24)
    secret: process.env.NEXTAUTH_SECRET,
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.abcadviesnconsultancy.com' : undefined
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.isActive = user.isActive
        token.loginTime = Date.now()
        token.lastActivity = Date.now()
      }
      
      // Session timeout validation (8 hours)
      if (token.loginTime && Date.now() - (token.loginTime as number) > 8 * 60 * 60 * 1000) {
        // Mark token as expired instead of returning null
        token.isActive = false
        token.expired = true
      }
      
      // Activity timeout validation (2 hours inactivity)
      if (token.lastActivity && Date.now() - (token.lastActivity as number) > 2 * 60 * 60 * 1000) {
        // Mark token as expired instead of returning null
        token.isActive = false
        token.inactive = true
      }
      
      // Update last activity if still active
      if (token.isActive) {
        token.lastActivity = Date.now()
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.isActive = token.isActive as boolean
        
        // Additional security check in session
        if (!token.isActive || token.expired || token.inactive) {
          throw new Error('Session expired or account is no longer active')
        }
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Additional security checks during sign-in
      if (!user?.isActive) {
        return false
      }
      
      // Log successful sign-in for security monitoring
      console.log(`🔐 Successful sign-in: ${user.email} at ${new Date().toISOString()}`)
      
      return true
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  debug: process.env.NODE_ENV === 'development',
}

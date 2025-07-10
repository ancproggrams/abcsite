
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from '../../../../lib/db'
import { logToFile, clearLogFile } from '../../../../lib/logger'
import * as bcrypt from 'bcryptjs'

// Clear log file at startup
clearLogFile()
logToFile('🚀 NextAuth configuration loading...')

const handler = NextAuth({
  debug: true,
  logger: {
    error(code, metadata) {
      logToFile(`❌ NextAuth ERROR: ${code}`, metadata)
    },
    warn(code) {
      logToFile(`⚠️ NextAuth WARN: ${code}`)
    },
    debug(code, metadata) {
      logToFile(`🐛 NextAuth DEBUG: ${code}`, metadata)
    }
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        logToFile('🔐 AUTHORIZE FUNCTION CALLED!', { 
          credentials: credentials ? { email: credentials.email, hasPassword: !!credentials.password } : null,
          req: req ? { method: req.method, headers: Object.keys(req.headers || {}) } : null
        })

        try {
          if (!credentials?.email || !credentials?.password) {
            logToFile('❌ Missing credentials', { email: !!credentials?.email, password: !!credentials?.password })
            return null
          }

          logToFile('📧 Looking up user in database', { email: credentials.email })

          // Find user in database
          const user = await db.user.findUnique({
            where: { email: credentials.email }
          })

          logToFile('👤 Database user lookup result', { 
            found: !!user, 
            userId: user?.id,
            userEmail: user?.email,
            userRole: user?.role
          })

          if (!user) {
            logToFile('❌ User not found in database')
            return null
          }

          // Verify password
          logToFile('🔍 Verifying password...')
          const passwordValid = await bcrypt.compare(credentials.password, user.password || '')
          logToFile('🔑 Password verification result', { valid: passwordValid })

          if (!passwordValid) {
            logToFile('❌ Invalid password')
            return null
          }

          const returnUser = {
            id: user.id,
            email: user.email,
            name: user.name || user.email,
            role: user.role
          }

          logToFile('✅ Authentication successful, returning user', returnUser)
          return returnUser

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          const errorStack = error instanceof Error ? error.stack : undefined
          logToFile('💥 Error in authorize function', { error: errorMessage, stack: errorStack })
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      logToFile('📋 signIn callback called', { 
        user: user ? { id: user.id, email: user.email, role: user.role } : null,
        account: account ? { provider: account.provider, type: account.type } : null,
        email
      })
      return true
    },
    async redirect({ url, baseUrl }) {
      logToFile('🔄 redirect callback called', { url, baseUrl })
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      logToFile('🎫 JWT callback called', { 
        tokenSub: token?.sub,
        user: user ? { id: user.id, email: user.email, role: user.role } : null,
        account: account ? { provider: account.provider } : null,
        isNewUser
      })

      if (user) {
        token.role = user.role
        logToFile('🎫 Added role to token', { role: user.role })
      }
      return token
    },
    async session({ session, token, user }) {
      logToFile('📱 session callback called', { 
        sessionUser: session?.user ? { email: session.user.email } : null,
        tokenSub: token?.sub,
        tokenRole: token?.role
      })

      if (token && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as string
        logToFile('📱 Updated session with token data', { 
          userId: session.user.id, 
          userRole: session.user.role 
        })
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login'
  },
  events: {
    async signIn(message) {
      logToFile('🎉 EVENT: User signed in', message)
    },
    async signOut(message) {
      logToFile('👋 EVENT: User signed out', message)
    },
    async createUser(message) {
      logToFile('👤 EVENT: User created', message)
    },
    async session(message) {
      logToFile('📱 EVENT: Session accessed', message)
    }
  }
})

logToFile('✅ NextAuth configuration completed')

export { handler as GET, handler as POST }


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
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.isActive = user.isActive
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.isActive = token.isActive as boolean
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  debug: process.env.NODE_ENV === 'development',
}

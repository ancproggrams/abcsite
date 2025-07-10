import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '../../../../lib/db'
import * as bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🚨 AUTHORIZE FUNCTION IS DEFINITELY CALLED!!! 🚨')
        console.log('🚨 AUTHORIZE FUNCTION IS DEFINITELY CALLED!!! 🚨')
        console.log('🚨 AUTHORIZE FUNCTION IS DEFINITELY CALLED!!! 🚨')
        
        // Return hardcoded admin user for testing
        return {
          id: 'test-admin-id',
          email: 'admin@adviesnconsultancy.nl', 
          name: 'Test Admin',
          role: 'admin'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login'
  }
})

export { handler as GET, handler as POST }

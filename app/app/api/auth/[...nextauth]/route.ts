import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials", 
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("🚨 AUTHORIZE FUNCTION CALLED", credentials);
        
        // Write to file to confirm function is called
        const fs = require('fs');
        const timestamp = new Date().toISOString();
        fs.appendFileSync('/home/ubuntu/advies-n-consultancy/app/authorize-debug.log', 
          `${timestamp}: 🚨 AUTHORIZE FUNCTION CALLED with credentials: ${JSON.stringify(credentials)}\n`);
        
        // jouw auth logic
        return { id: "1", name: 'Marc', email: 'marc@example.com' }; // test-user
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login'
  }
})

export { handler as GET, handler as POST }
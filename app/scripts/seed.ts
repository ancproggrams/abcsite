
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create some sample contact submissions for testing
  const sampleContacts = [
    {
      name: 'Jan Jansen',
      email: 'jan@example.com',
      company: 'Voorbeeld BV',
      message: 'Ik ben geïnteresseerd in compliance automation.'
    },
    {
      name: 'Marie Pietersen',
      email: 'marie@example.com',
      message: 'Graag meer informatie over uw IT consultancy diensten.'
    }
  ]

  for (const contact of sampleContacts) {
    await prisma.contact.create({
      data: contact
    })
    console.log('✅ Sample contact created for:', contact.email)
  }

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

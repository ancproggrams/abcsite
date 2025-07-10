
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('Ik,ben@dmin@02!', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'marc@adviesnconsultancy.nl' },
    update: {},
    create: {
      email: 'marc@adviesnconsultancy.nl',
      name: 'Marc van der Berg',
      password: hashedPassword,
      role: 'admin'
    }
  })

  console.log('✅ Admin user created:', adminUser.email)

  // Create some sample Quick Scan results for testing
  const sampleResults = [
    {
      email: 'test1@example.com',
      name: 'Test User 1',
      totalScore: 75.5,
      maturityLevel: 'Managed',
      answers: [],
      categoryScores: {
        'Organisatie': { score: 18, maxScore: 24, percentage: 75 },
        'Risk Management': { score: 16, maxScore: 20, percentage: 80 },
        'Techniek': { score: 20, maxScore: 28, percentage: 71 },
        'Training & Awareness': { score: 8, maxScore: 12, percentage: 67 },
        'Monitoring & Verbetering': { score: 9, maxScore: 12, percentage: 75 }
      }
    },
    {
      email: 'test2@example.com',
      name: 'Test User 2',
      totalScore: 45.2,
      maturityLevel: 'Defined',
      answers: [],
      categoryScores: {
        'Organisatie': { score: 12, maxScore: 24, percentage: 50 },
        'Risk Management': { score: 8, maxScore: 20, percentage: 40 },
        'Techniek': { score: 13, maxScore: 28, percentage: 46 },
        'Training & Awareness': { score: 4, maxScore: 12, percentage: 33 },
        'Monitoring & Verbetering': { score: 6, maxScore: 12, percentage: 50 }
      }
    }
  ]

  for (const result of sampleResults) {
    await prisma.quickScanResult.create({
      data: result
    })
    console.log('✅ Sample result created for:', result.email)
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

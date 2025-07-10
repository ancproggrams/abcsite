
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, answers, totalScore, maturityLevel, categoryScores } = body

    // Save to database
    const result = await db.quickScanResult.create({
      data: {
        name,
        email,
        answers,
        totalScore,
        maturityLevel,
        categoryScores
      }
    })

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Error saving quick scan result:', error)
    return NextResponse.json(
      { error: 'Failed to save quick scan result' },
      { status: 500 }
    )
  }
}

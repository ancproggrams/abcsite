
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, interest, message, formType } = body

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Log the form submission (in production, save to database)
    console.log('Contact form submission:', {
      name,
      email,
      company,
      phone,
      interest,
      message,
      formType,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    })

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Trigger workflows

    // For now, we'll just return success
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your submission. We will contact you within 24 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

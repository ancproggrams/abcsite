
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, message } = body

    // Send email to admin
    await resend.emails.send({
      from: 'Advies N Consultancy BV <noreply@adviesnconsultancy.nl>',
      to: ['marc@adviesnconsultancy.nl'],
      subject: `Nieuw Contact Formulier - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b82f6;">Nieuwe Contact Aanvraag</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">Contactgegevens</h3>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Bedrijf:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Telefoon:</strong> ${phone}</p>` : ''}
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">Bericht</h3>
            <p style="line-height: 1.6; color: #374151;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
            <p>Verzonden via het contact formulier op adviesnconsultancy.nl</p>
          </div>
        </div>
      `
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Advies N Consultancy BV <noreply@adviesnconsultancy.nl>',
      to: [email],
      subject: 'Bedankt voor uw bericht',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b82f6;">Bedankt voor uw bericht</h2>
          
          <p>Beste ${name},</p>
          
          <p>Bedankt voor uw bericht. Wij hebben uw aanvraag ontvangen en zullen binnen 2 uur contact met u opnemen.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">Uw bericht</h3>
            <p style="line-height: 1.6; color: #374151;">${message}</p>
          </div>
          
          <p>Met vriendelijke groet,<br>
          Het team van Advies N Consultancy BV</p>
          
          <div style="margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>Advies N Consultancy BV</p>
            <p>info@adviesnconsultancy.nl | +31 (0) 20 123 4567</p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending contact email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

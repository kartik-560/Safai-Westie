import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {

    const body = await request.json()

    const { name, email, phone, message } = body
    
    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {

      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create transporter with ES6 import
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })


    await transporter.verify()


    // Email options
    const mailOptions = {
      from: `"SaafAI Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.SAAFAI_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact from ${name} - SaafAI`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background: #f9f9f9;">
          <div style="background: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #2D3436; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #636e72;">Name:</td>
                <td style="padding: 12px 0; color: #2D3436;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #636e72;">Email:</td>
                <td style="padding: 12px 0; color: #2D3436;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #636e72;">Phone:</td>
                <td style="padding: 12px 0; color: #2D3436;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #636e72; vertical-align: top;">Message:</td>
                <td style="padding: 12px 0; color: #2D3436;">${message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #636e72; font-size: 14px; margin: 0;">
                Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${message}`
    }

 
    const info = await transporter.sendMail(mailOptions)


    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId 
    })

  } catch (error) {
    console.error('💥 Email Error:', error.message)
    console.error('Stack:', error.stack)
    
    return NextResponse.json({ 
      error: error.message || 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}

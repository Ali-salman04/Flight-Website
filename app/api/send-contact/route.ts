import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // ✅ Correct transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password use karna hoga
      },
    });

    // ✅ Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: `Contact Form: ${subject} - Masters Flights`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #ea580c, #dc2626); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📧 New Contact Message</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Masters Flights</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #ea580c; margin-bottom: 20px; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">Contact Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>

            <h2 style="color: #ea580c; margin-bottom: 20px; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">Message</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="line-height: 1.6; color: #333; margin: 0;">${message}</p>
            </div>
          </div>
          
          <div style="background: #ea580c; color: white; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">
              This message was sent on ${new Date().toLocaleString()}
            </p>
            <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">
              Masters Flights - Your Trusted Travel Partner
            </p>
          </div>
        </div>
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

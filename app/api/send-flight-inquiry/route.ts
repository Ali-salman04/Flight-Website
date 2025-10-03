import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      from,
      to,
      departure,
      return: returnDate,
      passengers,
      tripType,
      email,
      name,
      phone,
    } = body;

    // ✅ Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // tumhara Gmail / App Password
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Mail Options
    const mailOptions = {
      from: `"${name || 'Client'}" <${process.env.EMAIL_USER}>`, // Gmail sender
      replyTo: email, // ✅ Client ki email yahan show hogi
      to: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
      subject: 'New Flight Inquiry - Starway Flights',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #ea580c, #dc2626); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">✈️ New Flight Inquiry</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Masters Flights</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #ea580c; margin-bottom: 20px; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">Customer Information</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p><strong>Name:</strong> ${name || 'Not provided'}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            </div>

            <h2 style="color: #ea580c; margin-bottom: 20px; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">Flight Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p><strong>From:</strong> ${from}</p>
              <p><strong>To:</strong> ${to}</p>
              <p><strong>Departure:</strong> ${departure}</p>
              ${
                tripType === 'round-trip'
                  ? `<p><strong>Return:</strong> ${returnDate || 'Not specified'}</p>`
                  : '<p><strong>Trip Type:</strong> One Way</p>'
              }
              <p><strong>Passengers:</strong> ${passengers} ${
        passengers === 1 ? 'Passenger' : 'Passengers'
      }</p>
              <p><strong>Trip Type:</strong> ${
                tripType === 'round-trip' ? 'Round Trip' : 'One Way'
              }</p>
            </div>
          </div>
          
          <div style="background: #ea580c; color: white; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">
              This inquiry was submitted on ${new Date().toLocaleString()}
            </p>
            <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">
              Starway Flights - Your Trusted Travel Partner
            </p>
          </div>
        </div>
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Flight inquiry sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send flight inquiry. Please try again.' },
      { status: 500 }
    );
  }
}

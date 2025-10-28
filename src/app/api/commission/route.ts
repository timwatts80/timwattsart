import { NextRequest, NextResponse } from 'next/server'

interface BrevoResponse {
  id?: number
  message?: string
  code?: string
}

async function addContactToBrevoList(email: string, name: string, projectType: string, message: string): Promise<boolean> {
  try {
    // Add contact to Brevo list (ID: 6)
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name,
          LASTNAME: '',
        },
        listIds: [6], // Commission list ID
        updateEnabled: true,
      }),
    })

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text()
      console.error('Brevo contact error:', errorText)
      
      // Try to parse as JSON, but handle plain text responses
      let errorData: BrevoResponse = {}
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }

      // Contact already exists is not an error for our purposes
      if (errorData.code === 'duplicate_parameter') {
        console.log('Contact already exists, proceeding with emails')
        return true
      }
      
      return false
    }

    return true
  } catch (error) {
    console.error('Error adding contact to Brevo:', error)
    return false
  }
}

async function sendConfirmationEmail(email: string, name: string, projectType: string): Promise<boolean> {
  try {
    const emailData = {
      sender: {
        name: 'Tim Watts',
        email: 'tim@onemorelight.cc'
      },
      to: [
        {
          email: email,
          name: name
        }
      ],
      subject: 'Commission Inquiry Received - Tim Watts Art',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; font-size: 28px; font-weight: 300; margin: 0;">Thank You for Your Interest</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 400; margin: 0 0 10px 0;">Commission Inquiry Details</h2>
            <p style="color: #666; margin: 0; font-size: 16px;"><strong>Project Type:</strong> ${projectType}</p>
          </div>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Hi ${name},
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out about a commission! I've received your inquiry and will review your project details carefully.
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            I'll respond within 24 hours with thoughts on your vision, timeline possibilities, and next steps for bringing your project to life.
          </p>
          
          <div style="background: #f0f0f0; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              <strong>What happens next:</strong><br>
              • I'll review your project details and vision<br>
              • You'll hear back within 24 hours<br>
              • We'll discuss timeline, pricing, and creative direction<br>
              • If we're a good fit, we'll move forward with your commission
            </p>
          </div>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">
            I'm excited to learn more about your project and explore how we can create something meaningful together.
          </p>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 14px;">
            Tim Watts<br>
            Artist<br>
            <a href="https://www.timwatts.art" style="color: #333; text-decoration: none;">www.timwatts.art</a>
          </div>
        </div>
      `,
      textContent: `Hi ${name},

Thank you for reaching out about a commission! I've received your inquiry and will review your project details carefully.

I'll respond within 24 hours with thoughts on your vision, timeline possibilities, and next steps for bringing your project to life.

What happens next:
• I'll review your project details and vision
• You'll hear back within 24 hours
• We'll discuss timeline, pricing, and creative direction
• If we're a good fit, we'll move forward with your commission

I'm excited to learn more about your project and explore how we can create something meaningful together.

Tim Watts
Artist
www.timwatts.art`
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Brevo confirmation email error:', errorText)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return false
  }
}

async function sendNotificationEmail(name: string, email: string, projectType: string, message: string): Promise<boolean> {
  try {
    const emailData = {
      sender: {
        name: 'Tim Watts Art Website',
        email: 'tim@onemorelight.cc'
      },
      to: [
        {
          email: 'tim@onemorelight.cc',
          name: 'Tim Watts'
        }
      ],
      subject: `New Commission Inquiry: ${projectType}`,
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 400; margin-bottom: 20px;">New Commission Inquiry</h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 18px; font-weight: 400; margin: 0 0 15px 0;">Contact Details</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Project Type:</strong> ${projectType}</p>
          </div>
          
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 18px; font-weight: 400; margin: 0 0 15px 0;">Project Details</h2>
            <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</div>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Remember to respond within 24 hours as promised in the confirmation email.
          </p>
        </div>
      `,
      textContent: `New Commission Inquiry

Contact Details:
Name: ${name}
Email: ${email}
Project Type: ${projectType}

Project Details:
${message}

Remember to respond within 24 hours as promised in the confirmation email.`
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Brevo notification email error:', errorText)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending notification email:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const projectType = formData.get('project') as string
    const message = formData.get('message') as string

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Add to Brevo contact list
    const contactAdded = await addContactToBrevoList(email, name, projectType, message)
    if (!contactAdded) {
      return NextResponse.json(
        { error: 'Failed to add to commission list' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    const confirmationSent = await sendConfirmationEmail(email, name, projectType)
    
    // Send notification email to you
    const notificationSent = await sendNotificationEmail(name, email, projectType, message)

    if (!confirmationSent || !notificationSent) {
      // Contact was added but emails failed - still consider it a success
      console.warn('Contact added but some emails failed to send')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Commission inquiry submitted successfully' 
    })

  } catch (error) {
    console.error('Commission API error:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
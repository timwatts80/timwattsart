import { NextRequest, NextResponse } from 'next/server'

interface BrevoResponse {
  id?: number
  message?: string
  code?: string
}

async function addContactToBrevoList(email: string, name: string, artworkTitle: string, artworkId: string): Promise<boolean> {
  try {
    // Add contact to Brevo list (ID: 5)
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
        listIds: [5], // Preorder list ID
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

async function sendConfirmationEmail(email: string, name: string, artworkTitle: string): Promise<boolean> {
  try {
    const emailData = {
      sender: {
        name: 'Tim Watts',
        email: 'info@timwatts.art'
      },
      to: [
        {
          email: email,
          name: name
        }
      ],
      subject: `Print Notification Confirmed: ${artworkTitle}`,
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; font-size: 28px; font-weight: 300; margin: 0;">You're on the list!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 400; margin: 0 0 10px 0;">Print Notification Request</h2>
            <p style="color: #666; margin: 0; font-size: 16px;"><strong>Artwork:</strong> ${artworkTitle}</p>
          </div>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Hi ${name},
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Thanks for your interest in a print of "${artworkTitle}". I'll notify you as soon as the final prints are produced and ready to order.
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            There's no commitment required - when the prints are ready, you'll get an email with details and can decide if you'd like to order at that time.
          </p>
          
          <div style="background: #f0f0f0; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              <strong>What happens next:</strong><br>
              • I'll finalize the print specifications and quality<br>
              • You'll receive an email when prints are available<br>
              • No payment or commitment required until you decide to order
            </p>
          </div>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">
            Thanks for your interest in my work!
          </p>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 14px;">
            Tim Watts<br>
            Artist<br>
            <a href="https://www.timwatts.art" style="color: #333; text-decoration: none;">www.timwatts.art</a>
          </div>
        </div>
      `,
      textContent: `Hi ${name},

Thanks for your interest in a print of "${artworkTitle}". I'll notify you as soon as the final prints are produced and ready to order.

There's no commitment required - when the prints are ready, you'll get an email with details and can decide if you'd like to order at that time.

What happens next:
• I'll finalize the print specifications and quality
• You'll receive an email when prints are available  
• No payment or commitment required until you decide to order

Thanks for your interest in my work!

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

async function sendNotificationEmail(name: string, email: string, artworkTitle: string, artworkId: string): Promise<boolean> {
  try {
    const emailData = {
      sender: {
        name: 'Tim Watts Art Website',
        email: 'info@timwatts.art'
      },
      to: [
        {
          email: 'tim@onemorelight.cc',
          name: 'Tim Watts'
        }
      ],
      subject: `New Print Notification Request: ${artworkTitle}`,
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 400; margin-bottom: 20px;">New Print Notification Request</h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 18px; font-weight: 400; margin: 0 0 15px 0;">Contact Details</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 18px; font-weight: 400; margin: 0 0 15px 0;">Artwork Interest</h2>
            <p style="margin: 5px 0;"><strong>Artwork:</strong> ${artworkTitle}</p>
            <p style="margin: 5px 0;"><strong>Artwork ID:</strong> #${artworkId}</p>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            This person has been added to your preorder notification list and will be contacted when prints are available.
          </p>
        </div>
      `,
      textContent: `New Print Notification Request

Contact Details:
Name: ${name}
Email: ${email}

Artwork Interest:
Artwork: ${artworkTitle}
Artwork ID: #${artworkId}

This person has been added to your preorder notification list and will be contacted when prints are available.`
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
    const artworkTitle = formData.get('artwork') as string
    const artworkId = formData.get('artworkId') as string

    if (!name || !email || !artworkTitle || !artworkId) {
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
    const contactAdded = await addContactToBrevoList(email, name, artworkTitle, artworkId)
    if (!contactAdded) {
      return NextResponse.json(
        { error: 'Failed to add to notification list' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    const confirmationSent = await sendConfirmationEmail(email, name, artworkTitle)
    
    // Send notification email to you
    const notificationSent = await sendNotificationEmail(name, email, artworkTitle, artworkId)

    if (!confirmationSent || !notificationSent) {
      // Contact was added but emails failed - still consider it a success
      console.warn('Contact added but some emails failed to send')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Print notification request submitted successfully' 
    })

  } catch (error) {
    console.error('Preorder API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Add contact to Brevo list ID 23
    try {
      const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          listIds: [23],
          updateEnabled: true,
        }),
      })

      if (!contactResponse.ok) {
        const errorText = await contactResponse.text()
        let errorData: any = {}
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { message: errorText }
        }

        // Contact already exists is not an error
        if (errorData.code !== 'duplicate_parameter') {
          console.error('Brevo contact error:', errorText)
        } else {
          console.log('Contact already exists in list, proceeding')
        }
      } else {
        console.log('Contact added to Brevo list 23:', email)
      }
    } catch (error) {
      console.error('Error adding contact to Brevo:', error)
    }

    // Send confirmation email to user
    const confirmationEmail = {
      sender: {
        name: 'Tim Watts',
        email: 'tim@onemorelight.cc'
      },
      replyTo: {
        email: 'info@timwatts.art',
        name: 'Tim Watts'
      },
      to: [
        {
          email: email,
          name: 'Friend'
        }
      ],
      subject: 'Thanks for reaching out! - Tim Watts',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Hi there,
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            I'm glad you like my website! Thanks for letting me know.
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Beyond creating art, I also build custom websites professionally. I love helping people bring their vision to life online with clean, thoughtful design and solid functionality.
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            I'll reach out within the next day or two to learn more about what you're looking for and see if we might be a good fit to work together.
          </p>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 30px;">
            Talk soon,<br>
            Tim
          </p>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 14px;">
            Tim Watts<br>
            Artist & Web Developer<br>
            <a href="https://www.timwatts.art" style="color: #333; text-decoration: none;">www.timwatts.art</a>
          </div>
        </div>
      `,
      textContent: `Hi there,

I'm glad you like my website! Thanks for letting me know.

Beyond creating art, I also build custom websites professionally. I love helping people bring their vision to life online with clean, thoughtful design and solid functionality.

I'll reach out within the next day or two to learn more about what you're looking for and see if we might be a good fit to work together.

Talk soon,
Tim

Tim Watts
Artist & Web Developer
www.timwatts.art`
    }

    const confirmationResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(confirmationEmail),
    })

    if (!confirmationResponse.ok) {
      const errorText = await confirmationResponse.text()
      console.error('Brevo confirmation email error:', {
        status: confirmationResponse.status,
        statusText: confirmationResponse.statusText,
        error: errorText,
        email: email
      })
    } else {
      console.log('Confirmation email sent successfully to:', email)
    }

    // Send notification email to you
    const notificationEmail = {
      sender: {
        name: 'Tim Watts Art Website',
        email: 'tim@onemorelight.cc'
      },
      to: [
        {
          email: 'info@timwatts.art',
          name: 'Tim Watts'
        }
      ],
      subject: 'Website Development Interest',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 400; margin-bottom: 20px;">Website Development Interest</h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0; font-size: 16px;">Someone is interested in website development.</p>
            <p style="margin: 15px 0 5px 0;"><strong>Contact them at:</strong></p>
            <p style="margin: 5px 0; font-size: 18px; color: #0066cc;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></p>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
              <strong>Note:</strong> A confirmation email was ${confirmationResponse.ok ? 'successfully sent' : 'attempted but may have failed'} to this address.
            </p>
          </div>
        </div>
      `,
      textContent: `Website Development Interest

Someone is interested in website development.

Contact them at: ${email}`
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(notificationEmail),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Brevo notification email error:', errorText)
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Interest notification sent' 
    })

  } catch (error) {
    console.error('Website interest API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

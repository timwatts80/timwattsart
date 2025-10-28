import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY!

// Function to send confirmation email to subscriber
async function sendConfirmationEmail(email: string, firstName: string) {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: 'Tim Watts Art',
          email: 'tim@onemorelight.cc'
        },
        to: [
          {
            email: email,
            name: firstName
          }
        ],
        subject: 'Welcome to Tim Watts Art Newsletter!',
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Tim Watts Art</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 1px;">
                  Tim Watts Art
                </h1>
                <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                  Contemporary Art & Expression
                </p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 30px;">
                <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px; font-weight: 300;">
                  Hey ${firstName}!
                </h2>
                
                <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                  Thanks for subscribing to my newsletter! I'm excited to share my artistic journey with you and keep you updated on what's happening in my studio.
                </p>
                
                <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                  Here's what I'll be sending your way:
                </p>
                
                <ul style="color: #666666; line-height: 1.8; margin: 0 0 30px 0; font-size: 16px; padding-left: 20px;">
                  <li>Updates when I release new original pieces and prints</li>
                  <li>First look at fresh work I add to the gallery</li>
                  <li>Techniques and insights from my studio process</li>
                  <li>News and updates from my Art Riot project</li>
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://timwatts.art" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 4px; font-size: 16px; font-weight: 500; letter-spacing: 0.5px;">
                    Check Out My Gallery
                  </a>
                </div>
                
                <p style="color: #666666; line-height: 1.6; margin: 30px 0 20px 0; font-size: 16px;">
                  Looking forward to sharing this creative journey with you!
                </p>
                
                <p style="color: #666666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                  -Tim
                </p>
                
                <p style="color: #666666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px; font-style: italic;">
                  "Art is more than a product. It's a dialogue between artist and viewer."
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px;">
                  Tim Watts Art
                </p>
                <p style="color: #999999; margin: 0; font-size: 12px;">
                  You're receiving this because you subscribed to my newsletter at timwatts.art
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
        textContent: `
Hey ${firstName}!

Thanks for subscribing to my newsletter! I'm excited to share my artistic journey with you and keep you updated on what's happening in my studio.

Here's what I'll be sending your way:
• Updates when I release new original pieces and prints
• First look at fresh work I add to the gallery
• Techniques and insights from my studio process
• News and updates from my Art Riot project

Check out my gallery: https://timwatts.art

Looking forward to sharing this creative journey with you!

Tim Watts

"Art is more than a product. It's a dialogue between artist and viewer."

Tim Watts Art Studio
You received this email because you subscribed to our newsletter at timwatts.art
        `
      }),
    });
    
    if (response.ok) {
      console.log('Confirmation email sent successfully');
    } else {
      const errorText = await response.text();
      console.error('Failed to send confirmation email:', errorText);
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

// Function to send notification email to sales team
async function sendNotificationEmail(email: string, firstName?: string, lastName?: string) {
  try {
    const name = [firstName, lastName].filter(Boolean).join(' ') || 'Not provided';
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
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
        subject: 'New Newsletter Subscription',
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Newsletter Subscription</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <div style="background-color: #000000; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 300;">
                  New Newsletter Subscriber
                </h1>
              </div>
              
              <!-- Content -->
              <div style="padding: 30px;">
                <p style="color: #333333; margin: 0 0 20px 0; font-size: 16px;">
                  Someone just subscribed to the Tim Watts Art newsletter!
                </p>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #666666;"><strong>Email:</strong> ${email}</p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #666666;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 0; font-size: 14px; color: #666666;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                </div>
                
                <p style="color: #666666; margin: 20px 0 0 0; font-size: 14px;">
                  They've been automatically added to the newsletter list and received a welcome email.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
        textContent: `
New Newsletter Subscriber

Someone just subscribed to the Tim Watts Art newsletter!

Email: ${email}
Name: ${name}
Date: ${new Date().toLocaleString()}

They've been automatically added to the newsletter list and received a welcome email.
        `
      }),
    });
    
    if (response.ok) {
      console.log('Notification email sent successfully');
    } else {
      const errorText = await response.text();
      console.error('Failed to send notification email:', errorText);
    }
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Add contact to Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: firstName || '',
          LASTNAME: lastName || '',
        },
        listIds: [4], // Tim Watts Art newsletter list
        updateEnabled: true, // Update contact if it already exists
      }),
    });

    if (brevoResponse.ok) {
      let data;
      try {
        const responseText = await brevoResponse.text();
        data = responseText ? JSON.parse(responseText) : {};
        console.log('Contact added to Brevo:', data);
      } catch (parseError) {
        console.log('Contact added to Brevo successfully (no JSON response)');
        data = { success: true };
      }
      
      // Send confirmation email to subscriber
      await sendConfirmationEmail(email, firstName || 'Art Enthusiast');
      
      // Send notification email to sales team
      await sendNotificationEmail(email, firstName, lastName);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      });
    } else {
      let errorData;
      try {
        const errorText = await brevoResponse.text();
        errorData = errorText ? JSON.parse(errorText) : { error: 'Unknown error' };
      } catch (parseError) {
        console.error('Failed to parse Brevo error response');
        errorData = { error: 'API communication error' };
      }
      
      console.error('Brevo API error:', errorData);
      
      // If contact already exists, that's still a success for the user
      if (errorData.code === 'duplicate_parameter') {
        // Still send emails for existing contacts
        await sendConfirmationEmail(email, firstName || 'Art Enthusiast');
        await sendNotificationEmail(email, firstName, lastName);
        
        return NextResponse.json({ 
          success: true, 
          message: 'Email already subscribed' 
        });
      }
      
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
// Test script for Brevo email functionality
async function testBrevoEmails() {
  try {
    console.log('🧪 Testing Brevo newsletter integration with emails...\n');

    // Test the API endpoint with a real email
    const response = await fetch('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@timwatts.art',
        firstName: 'Test',
        lastName: 'User'
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Newsletter API Response:', data);
      console.log('🎉 Successfully subscribed and emails should be sent!');
      console.log('\n📧 Expected emails:');
      console.log('1. Confirmation email sent to: test@timwatts.art');
      console.log('2. Notification email sent to: sales@timwatts.art');
    } else {
      console.log('❌ API Error:', data);
      console.log('Response status:', response.status);
    }

  } catch (error) {
    console.error('❌ Error testing Brevo integration:', error);
  }
}

// Only run if we're calling this directly
if (typeof window === 'undefined') {
  testBrevoEmails();
}

module.exports = { testBrevoEmails };
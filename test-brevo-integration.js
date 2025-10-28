// Test script for Brevo newsletter integration
async function testBrevoIntegration() {
  try {
    console.log('🧪 Testing Brevo newsletter integration...\n');

    // Test the API endpoint
    const response = await fetch('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Newsletter API Response:', data);
      console.log('🎉 Successfully connected to Brevo!');
    } else {
      console.log('❌ API Error:', data);
      console.log('Response status:', response.status);
    }

    // Test with just email (as the form sends)
    console.log('\n🧪 Testing with email only...');
    const response2 = await fetch('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'newsletter-test@timwatts.art'
      }),
    });

    const data2 = await response2.json();

    if (response2.ok) {
      console.log('✅ Email-only API Response:', data2);
      console.log('🎉 Email subscription working!');
    } else {
      console.log('❌ Email-only API Error:', data2);
      console.log('Response status:', response2.status);
    }

  } catch (error) {
    console.error('❌ Error testing Brevo integration:', error);
  }
}

// Only run if we're calling this directly
if (typeof window === 'undefined') {
  testBrevoIntegration();
}

module.exports = { testBrevoIntegration };
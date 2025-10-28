// Test script for the new preorder API integration
const testPreorderAPI = async () => {
  console.log('🧪 Testing Preorder API Integration...\n')

  try {
    // Create form data like the component would
    const formData = new FormData()
    formData.append('name', 'Test User')
    formData.append('email', 'tim@onemorelight.cc') // Using your email for testing
    formData.append('artwork', 'Silent Echoes')
    formData.append('artworkId', '3')

    console.log('📤 Sending preorder request...')
    const response = await fetch('http://localhost:3000/api/preorder', {
      method: 'POST',
      body: formData,
    })

    console.log(`📡 Response status: ${response.status}`)
    
    const result = await response.json()
    console.log('📋 Response data:', result)

    if (response.ok) {
      console.log('✅ Preorder API test successful!')
      console.log('📧 Check your email for:')
      console.log('   - Confirmation email to test user')
      console.log('   - Notification email to tim@onemorelight.cc')
      console.log('📝 Contact should be added to Brevo list ID: 5')
    } else {
      console.log('❌ Preorder API test failed:', result.error)
    }

  } catch (error) {
    console.error('💥 Test error:', error.message)
  }
}

// Run the test
testPreorderAPI()
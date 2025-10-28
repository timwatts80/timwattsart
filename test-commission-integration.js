// Test script for the commission API integration
const testCommissionAPI = async () => {
  console.log('🧪 Testing Commission API Integration...\n')

  try {
    // Create form data like the component would
    const formData = new FormData()
    formData.append('name', 'Test Artist')
    formData.append('email', 'tim@onemorelight.cc') // Using your email for testing
    formData.append('project', 'original')
    formData.append('message', 'I would like to commission a large abstract piece for my living room. Interested in blues and greens, around 36x48 inches. Budget range $2000-3000.')

    console.log('📤 Sending commission inquiry...')
    const response = await fetch('http://localhost:3000/api/commission', {
      method: 'POST',
      body: formData,
    })

    console.log(`📡 Response status: ${response.status}`)
    
    const result = await response.json()
    console.log('📋 Response data:', result)

    if (response.ok) {
      console.log('✅ Commission API test successful!')
      console.log('📧 Check your email for:')
      console.log('   - Confirmation email to test user')
      console.log('   - Notification email to tim@onemorelight.cc')
      console.log('📝 Contact should be added to Brevo list ID: 6')
    } else {
      console.log('❌ Commission API test failed:', result.error)
    }

  } catch (error) {
    console.error('💥 Test error:', error.message)
  }
}

// Run the test
testCommissionAPI()
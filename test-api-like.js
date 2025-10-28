require('dotenv').config();

async function testLikeAPI() {
  try {
    console.log('🧪 Testing the Like API for artwork 15...\n');
    
    // Test the API endpoint
    const response = await fetch('http://localhost:3000/api/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ artworkId: 15 }),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Response:', data);
      console.log(`🎉 Successfully liked artwork 15! New count: ${data.likeCount}`);
    } else {
      const errorData = await response.text();
      console.log('❌ API Error:', response.status, errorData);
    }
    
    // Also test the GET endpoint to make sure artwork 15 is included
    const getResponse = await fetch('http://localhost:3000/api/likes');
    if (getResponse.ok) {
      const likesData = await getResponse.json();
      console.log(`\n📊 Current like count for artwork 15: ${likesData.likeCounts[15] || 'not found'}`);
      console.log(`📈 Total artworks with like data: ${Object.keys(likesData.likeCounts).length}`);
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error);
  }
}

testLikeAPI();
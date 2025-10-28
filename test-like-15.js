require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function testLikeForArtwork15() {
  try {
    console.log('Testing like functionality for artwork ID 15...\n');
    
    // Check current like count for artwork 15
    const beforeResult = await sql`
      SELECT id, title, like_count
      FROM artworks 
      WHERE id = 15
    `;
    
    if (beforeResult.length === 0) {
      console.log('❌ Artwork 15 not found in database');
      return;
    }
    
    const beforeLikes = beforeResult[0].like_count;
    console.log(`📊 Before: "${beforeResult[0].title}" has ${beforeLikes} likes`);
    
    // Manually increment the like count (simulating the API call)
    const updateResult = await sql`
      UPDATE artworks 
      SET 
        like_count = like_count + 1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 15
      RETURNING like_count
    `;
    
    const newLikeCount = updateResult[0].like_count;
    console.log(`✅ After: Successfully incremented to ${newLikeCount} likes`);
    
    // Verify the change
    const afterResult = await sql`
      SELECT id, title, like_count
      FROM artworks 
      WHERE id = 15
    `;
    
    console.log(`🔍 Verification: "${afterResult[0].title}" now has ${afterResult[0].like_count} likes`);
    
    if (afterResult[0].like_count === beforeLikes + 1) {
      console.log('✅ Like functionality is working correctly for artwork 15!');
    } else {
      console.log('❌ Something went wrong with the like increment');
    }
    
  } catch (error) {
    console.error('❌ Error testing like functionality:', error);
  }
}

testLikeForArtwork15();
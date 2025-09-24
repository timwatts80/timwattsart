const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function updateLikeCounts() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    console.log('🔄 Updating like counts with random numbers...');
    
    // Generate random like counts for each artwork (between 100-2000)
    const artworkUpdates = [];
    for (let i = 1; i <= 14; i++) {
      // Generate random number between 100 and 2000
      const randomLikes = Math.floor(Math.random() * (2000 - 100 + 1)) + 100;
      artworkUpdates.push({ id: i, likes: randomLikes });
    }
    
    console.log('📊 Generated like counts:');
    artworkUpdates.forEach(artwork => {
      console.log(`   Artwork ${artwork.id}: ${artwork.likes} likes`);
    });
    
    // Update each artwork with its random like count
    for (const artwork of artworkUpdates) {
      await sql`
        UPDATE artworks 
        SET like_count = ${artwork.likes}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ${artwork.id}
      `;
    }
    
    // Verify the updates
    const result = await sql`SELECT id, title, like_count FROM artworks ORDER BY id`;
    console.log('\n✅ Like counts updated successfully!');
    console.log('📊 Updated artworks table:');
    result.forEach(artwork => {
      console.log(`   ID ${artwork.id}: ${artwork.title} - ${artwork.like_count.toLocaleString()} likes`);
    });
    
    const totalLikes = result.reduce((sum, artwork) => sum + artwork.like_count, 0);
    console.log(`\n🎉 Total likes across all artworks: ${totalLikes.toLocaleString()}`);
    
  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

// Run update
updateLikeCounts();
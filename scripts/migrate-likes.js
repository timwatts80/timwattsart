const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function migrateLikes() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    console.log('🔄 Starting likes schema migration...');
    
    // First, let's check if we have existing likes to preserve
    let existingLikes = {};
    try {
      const oldLikes = await sql`
        SELECT artwork_id, COUNT(*) as count 
        FROM artwork_likes 
        GROUP BY artwork_id
      `;
      existingLikes = Object.fromEntries(oldLikes.map(row => [row.artwork_id, parseInt(row.count)]));
      console.log('📊 Found existing likes:', existingLikes);
    } catch (error) {
      console.log('ℹ️  No existing artwork_likes table found, starting fresh');
    }
    
    // Add like_count column to existing artworks table if it doesn't exist
    try {
      await sql`ALTER TABLE artworks ADD COLUMN like_count INTEGER DEFAULT 0`;
      console.log('✅ Added like_count column to artworks table');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  like_count column already exists');
      } else {
        throw error;
      }
    }
    
    // Update like counts for existing artworks based on old data
    for (const [artworkId, count] of Object.entries(existingLikes)) {
      await sql`
        UPDATE artworks 
        SET like_count = ${count}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ${parseInt(artworkId)}
      `;
    }
    
    // Ensure all artworks have like_count set (default to 0 if null)
    await sql`
      UPDATE artworks 
      SET like_count = 0 
      WHERE like_count IS NULL
    `;
    
    // Drop the old table if it exists
    try {
      await sql`DROP TABLE IF EXISTS artwork_likes CASCADE`;
      console.log('🗑️  Dropped old artwork_likes table');
    } catch (error) {
      console.log('ℹ️  No artwork_likes table to drop');
    }
    
    // Verify the migration
    const result = await sql`SELECT id, title, like_count FROM artworks ORDER BY id`;
    console.log('✅ Migration completed successfully!');
    console.log('📊 Final artworks table:');
    result.forEach(artwork => {
      console.log(`   ID ${artwork.id}: ${artwork.title} - ${artwork.like_count} likes`);
    });
    
    console.log('\n🎉 Schema migration complete!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateLikes();
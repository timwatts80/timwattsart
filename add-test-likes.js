// Add some test likes to demonstrate the functionality
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function addTestLikes() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('Adding some test likes...');
    
    // Add some test likes for different artworks
    await sql`INSERT INTO artwork_likes (artwork_id) VALUES (1), (1), (1)`; // 3 likes for artwork 1
    await sql`INSERT INTO artwork_likes (artwork_id) VALUES (2), (2)`; // 2 likes for artwork 2  
    await sql`INSERT INTO artwork_likes (artwork_id) VALUES (3)`; // 1 like for artwork 3
    await sql`INSERT INTO artwork_likes (artwork_id) VALUES (5), (5), (5), (5)`; // 4 likes for artwork 5
    await sql`INSERT INTO artwork_likes (artwork_id) VALUES (8)`; // 1 like for artwork 8
    
    console.log('✅ Test likes added successfully!');
    
    // Show the results
    const totalLikes = await sql`SELECT COUNT(*) as count FROM artwork_likes`;
    console.log(`📊 Total likes in database: ${totalLikes[0].count}`);
    
    // Show likes by artwork
    const likesByArtwork = await sql`
      SELECT artwork_id, COUNT(*) as count 
      FROM artwork_likes 
      GROUP BY artwork_id 
      ORDER BY artwork_id
    `;
    
    console.log('\n📈 Likes by artwork:');
    likesByArtwork.forEach(row => {
      console.log(`  Artwork ${row.artwork_id}: ${row.count} likes`);
    });
    
  } catch (error) {
    console.error('❌ Error adding test likes:', error);
  }
}

addTestLikes();
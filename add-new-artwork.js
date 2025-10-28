require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function addNewArtwork() {
  try {
    console.log('Adding TIM_IMG_015.png to the database...');
    
    // Check current highest ID to get the next available ID
    const maxIdResult = await sql`SELECT MAX(id) as max_id FROM artworks`;
    const nextId = (maxIdResult[0].max_id || 0) + 1;
    
    console.log(`Next available ID: ${nextId}`);
    
    // Insert the new artwork
    const result = await sql`
      INSERT INTO artworks (id, title, medium, available, preorder, src, like_count)
      VALUES (${nextId}, 'Converging Lines', 'Mixed Media', true, false, '/images/TIM_IMG_015.png', 0)
      RETURNING *
    `;
    
    console.log('✅ Successfully added new artwork:');
    console.log(`ID: ${result[0].id}`);
    console.log(`Title: "${result[0].title}"`);
    console.log(`Medium: ${result[0].medium}`);
    console.log(`Image: ${result[0].src}`);
    console.log(`Available: ${result[0].available}`);
    console.log(`Preorder: ${result[0].preorder}`);
    console.log(`Likes: ${result[0].like_count}`);
    
    // Verify by checking total count
    const countResult = await sql`SELECT COUNT(*) as total FROM artworks`;
    console.log(`\n📊 Total artworks in database: ${countResult[0].total}`);
    
  } catch (error) {
    console.error('❌ Error adding artwork:', error);
  }
}

addNewArtwork();
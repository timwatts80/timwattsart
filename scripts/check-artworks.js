require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function checkArtworks() {
  try {
    console.log('Checking existing artworks...');
    
    const artworks = await sql`
      SELECT id, title, medium, image_path, available, preorder 
      FROM artworks 
      ORDER BY id ASC
    `;
    
    console.log(`Found ${artworks.length} artworks:`);
    artworks.forEach(artwork => {
      console.log(`${artwork.id}: "${artwork.title}" - ${artwork.medium} (${artwork.image_path})`);
    });
    
  } catch (error) {
    console.error('Error checking artworks:', error);
  }
}

checkArtworks();
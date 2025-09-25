require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function checkArtworks() {
  try {
    console.log('Checking artworks data...');
    
    const artworks = await sql`
      SELECT id, title, src, like_count
      FROM artworks 
      ORDER BY id ASC
      LIMIT 5
    `;
    
    console.log('First 5 artworks:');
    artworks.forEach(artwork => {
      console.log(`ID: ${artwork.id}, Title: "${artwork.title}", Image: "${artwork.src}", Likes: ${artwork.like_count}`);
    });
    
  } catch (error) {
    console.error('Error checking artworks:', error);
  }
}

checkArtworks();
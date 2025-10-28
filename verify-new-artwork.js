require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function verifyNewArtwork() {
  try {
    console.log('Verifying TIM_IMG_015.png was added successfully...\n');
    
    // Check for the specific artwork
    const newArtwork = await sql`
      SELECT id, title, medium, src, available, preorder, like_count
      FROM artworks 
      WHERE src = '/images/TIM_IMG_015.png'
    `;
    
    if (newArtwork.length > 0) {
      console.log('✅ Found TIM_IMG_015.png in database:');
      const artwork = newArtwork[0];
      console.log(`   ID: ${artwork.id}`);
      console.log(`   Title: "${artwork.title}"`);
      console.log(`   Medium: ${artwork.medium}`);
      console.log(`   Image Path: ${artwork.src}`);
      console.log(`   Available: ${artwork.available}`);
      console.log(`   Preorder: ${artwork.preorder}`);
      console.log(`   Likes: ${artwork.like_count}`);
    } else {
      console.log('❌ TIM_IMG_015.png not found in database');
      return;
    }
    
    // Get total count and recent artworks
    const totalCount = await sql`SELECT COUNT(*) as count FROM artworks`;
    console.log(`\n📊 Total artworks: ${totalCount[0].count}`);
    
    console.log('\n🎨 Latest 3 artworks in database:');
    const latestArtworks = await sql`
      SELECT id, title, src
      FROM artworks 
      ORDER BY id DESC 
      LIMIT 3
    `;
    
    latestArtworks.forEach(artwork => {
      console.log(`   ${artwork.id}: "${artwork.title}" (${artwork.src})`);
    });
    
    console.log('\n✨ The new artwork should now appear in your gallery at http://localhost:3001/#gallery');
    
  } catch (error) {
    console.error('❌ Error verifying artwork:', error);
  }
}

verifyNewArtwork();
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function updateImagePaths() {
  try {
    console.log('Updating artwork image paths...');
    
    // Update each artwork to use the correct image path
    for (let i = 1; i <= 14; i++) {
      const imagePath = `/images/TIM_IMG_${i.toString().padStart(3, '0')}.png`;
      
      await sql`
        UPDATE artworks 
        SET src = ${imagePath}
        WHERE id = ${i}
      `;
      
      console.log(`Updated artwork ${i} to use ${imagePath}`);
    }
    
    console.log('✓ All artwork image paths updated successfully');
    
    // Verify the updates
    console.log('\nVerifying updates:');
    const artworks = await sql`
      SELECT id, title, src
      FROM artworks 
      ORDER BY id ASC
      LIMIT 5
    `;
    
    artworks.forEach(artwork => {
      console.log(`ID: ${artwork.id}, Title: "${artwork.title}", Image: "${artwork.src}"`);
    });
    
  } catch (error) {
    console.error('Error updating image paths:', error);
  }
}

updateImagePaths();
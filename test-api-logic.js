require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function testAPILogic() {
  try {
    console.log('Testing API logic directly...\n');
    
    const artworkId = 1;
    
    // This is the exact query from the API
    const artworks = await sql`
      SELECT 
        id,
        title,
        medium,
        src as image_path,
        available,
        preorder,
        COALESCE(like_count, 0) as likes,
        story,
        created_at
      FROM artworks
      WHERE id = ${artworkId}
    `;

    if (artworks.length === 0) {
      console.log('Artwork not found');
      return;
    }

    const artwork = artworks[0];
    
    // Add additional fields with defaults (same as API)
    const response = {
      ...artwork,
      dimensions: 'Contact for details',
      year: 2025,
      technique: 'Mixed media',
      inspiration: 'Inspired by the beauty of artistic expression',
      certificate_id: `TWA-${artwork.id.toString().padStart(4, '0')}`
    };

    console.log('API would return:');
    console.log(JSON.stringify(response, null, 2));
    
    console.log('\n✅ Story exists:', !!response.story);
    console.log('✅ Story preview:', response.story?.substring(0, 100) + '...');

  } catch (error) {
    console.error('Error:', error);
  }
}

testAPILogic();
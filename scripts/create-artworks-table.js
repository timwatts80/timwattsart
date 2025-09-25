require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function createArtworksTable() {
  try {
    console.log('Creating artworks table...');
    
    // Create artworks table
    await sql`
      CREATE TABLE IF NOT EXISTS artworks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        medium VARCHAR(255) NOT NULL,
        image_path VARCHAR(500) NOT NULL,
        available BOOLEAN DEFAULT true,
        preorder BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    console.log('✓ Artworks table created successfully');
    
    // Check if table exists and is empty
    const existingArtworks = await sql`SELECT COUNT(*) as count FROM artworks`;
    console.log(`Current artworks count: ${existingArtworks[0].count}`);
    
  } catch (error) {
    console.error('Error creating artworks table:', error);
    process.exit(1);
  }
}

createArtworksTable();
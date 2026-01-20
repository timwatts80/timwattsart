// Add featured column to artworks table
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function addFeaturedColumn() {
  const sql = neon(process.env.DATABASE_URL);
  
  console.log('Connecting to Neon database...');
  
  try {
    console.log('Adding featured column to artworks table...');
    await sql`ALTER TABLE artworks ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false`;
    
    console.log('✅ Featured column added successfully!');
    
    // Optionally set some artworks as featured
    console.log('Setting featured artworks...');
    // Uncomment to set specific artworks as featured
    // await sql`UPDATE artworks SET featured = true WHERE id IN (2, 5, 8)`;
    
    console.log('✅ Migration complete!');
  } catch (error) {
    console.error('❌ Error adding featured column:', error);
    process.exit(1);
  }
}

addFeaturedColumn();

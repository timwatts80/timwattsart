const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function checkDatabase() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Check what tables exist
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Existing tables:', tables);
    
    // Try to describe artworks table if it exists
    try {
      const columns = await sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'artworks' 
        ORDER BY ordinal_position
      `;
      console.log('Artworks table structure:', columns);
    } catch (err) {
      console.log('No artworks table found');
    }
    
  } catch (error) {
    console.error('Database check failed:', error);
  }
}

checkDatabase();
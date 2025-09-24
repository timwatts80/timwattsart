// Setup script to initialize the database with the Neon serverless driver
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  const sql = neon(process.env.DATABASE_URL);
  
  console.log('Connecting to Neon database...');
  
  try {
    // Drop existing tables to start fresh
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS artwork_likes CASCADE`;
    await sql`DROP TABLE IF EXISTS artworks CASCADE`;

    // Create artworks table
    console.log('Creating artworks table...');
    await sql`
      CREATE TABLE artworks (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          medium TEXT NOT NULL,
          available BOOLEAN DEFAULT true,
          preorder BOOLEAN DEFAULT false,
          src TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create artwork_likes table  
    console.log('Creating artwork_likes table...');
    await sql`
      CREATE TABLE artwork_likes (
          id SERIAL PRIMARY KEY,
          artwork_id INTEGER REFERENCES artworks(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Insert artworks data
    console.log('Inserting artwork data...');
    await sql`
      INSERT INTO artworks (title, medium, available, preorder, src) VALUES
      ('Eternal Whispers', 'Oil on Canvas', true, false, '/gallery/1.jpg'),
      ('Shadows of Memory', 'Acrylic on Canvas', false, true, '/gallery/2.jpg'),
      ('Silent Echoes', 'Mixed Media', true, false, '/gallery/3.jpg'),
      ('Midnight Reverie', 'Oil on Canvas', true, false, '/gallery/4.jpg'),
      ('Fragmented Dreams', 'Digital Art', false, true, '/gallery/5.jpg'),
      ('Timeless Solitude', 'Watercolor', true, false, '/gallery/6.jpg'),
      ('Phantom Landscapes', 'Oil on Canvas', true, false, '/gallery/7.jpg'),
      ('Veiled Emotions', 'Acrylic on Canvas', false, true, '/gallery/8.jpg'),
      ('Mystic Horizons', 'Mixed Media', true, false, '/gallery/9.jpg'),
      ('Ethereal Moments', 'Oil on Canvas', true, false, '/gallery/10.jpg'),
      ('Subdued Reflections', 'Charcoal on Paper', false, true, '/gallery/11.jpg'),
      ('Infinite Depths', 'Oil on Canvas', true, false, '/gallery/12.jpg'),
      ('Spectral Visions', 'Digital Art', true, false, '/gallery/13.jpg'),
      ('Monochrome Dreams', 'Acrylic on Canvas', false, true, '/gallery/14.jpg')
    `;
    
    console.log('✅ Database setup completed successfully!');
    
    // Test query
    const result = await sql`SELECT COUNT(*) as count FROM artworks`;
    console.log(`📊 Found ${result[0].count} artworks in the database`);
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
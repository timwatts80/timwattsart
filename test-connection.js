// Simple test to verify Neon database connection
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function testConnection() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('Testing Neon database connection...');
    
    // Test basic query
    const result = await sql`SELECT COUNT(*) as count FROM artworks`;
    console.log(`✅ Connected successfully! Found ${result[0].count} artworks`);
    
    // Test likes query
    const likes = await sql`SELECT COUNT(*) as count FROM artwork_likes`;
    console.log(`✅ Found ${likes[0].count} total likes`);
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function updateColorfulCascadeStory() {
  try {
    const newStory = "The eighth creation ventures into rhythm and repetition, drawing inspiration from musical concepts. Visual beats and harmonies create a synesthetic experience where sight and sound seem to merge in unexpected ways.";
    
    // First, find the artwork
    const findResult = await pool.query(
      "SELECT id, title FROM artworks WHERE title ILIKE '%Colorful Cascade%'"
    );
    
    if (findResult.rows.length === 0) {
      console.log('No artwork found with title containing "Colorful Cascade"');
      return;
    }
    
    console.log('Found artwork(s):');
    findResult.rows.forEach(row => {
      console.log(`ID: ${row.id}, Title: ${row.title}`);
    });
    
    // Update the story for the first match
    const artworkId = findResult.rows[0].id;
    const updateResult = await pool.query(
      'UPDATE artworks SET story = $1 WHERE id = $2 RETURNING id, title, story',
      [newStory, artworkId]
    );
    
    if (updateResult.rows.length > 0) {
      const updated = updateResult.rows[0];
      console.log('\n✅ Story updated successfully!');
      console.log(`Artwork: ${updated.title} (ID: ${updated.id})`);
      console.log(`New Story: ${updated.story}`);
    } else {
      console.log('❌ Failed to update story');
    }
    
  } catch (error) {
    console.error('Error updating story:', error);
  } finally {
    await pool.end();
  }
}

updateColorfulCascadeStory();
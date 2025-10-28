import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    
    // Get all artworks with their like counts
    const artworks = await sql`
      SELECT id, like_count
      FROM artworks
      ORDER BY id
    `;
    
    // Convert to the format the frontend expects
    const likeCounts: Record<number, number> = {};
    artworks.forEach((artwork: any) => {
      likeCounts[artwork.id] = artwork.like_count || 0;
    });
    
    return Response.json({ likeCounts });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return Response.json({ error: 'Failed to fetch likes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { artworkId } = await request.json();
    
    if (!artworkId || artworkId < 1) {
      return Response.json({ error: 'Invalid artwork ID' }, { status: 400 });
    }
    
    const sql = neon(process.env.DATABASE_URL!);
    
    // Simply increment the like count for the existing artwork
    const result = await sql`
      UPDATE artworks 
      SET 
        like_count = like_count + 1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${artworkId}
      RETURNING like_count
    `;
    
    if (result.length === 0) {
      return Response.json({ error: 'Artwork not found' }, { status: 404 });
    }
    
    const newLikeCount = result[0].like_count;
    
    return Response.json({ 
      success: true, 
      artworkId, 
      likeCount: newLikeCount 
    });
  } catch (error) {
    console.error('Error incrementing like:', error);
    return Response.json({ error: 'Failed to increment like' }, { status: 500 });
  }
}
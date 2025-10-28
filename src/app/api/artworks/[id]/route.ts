import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  context: RouteParams
) {
  try {
    const { id } = await context.params;
    const artworkId = parseInt(id);
    
    if (isNaN(artworkId)) {
      return NextResponse.json(
        { error: 'Invalid artwork ID' },
        { status: 400 }
      );
    }

    // Fetch artwork with available columns
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
      return NextResponse.json(
        { error: 'Artwork not found' },
        { status: 404 }
      );
    }

    const artwork = artworks[0];
    
    // Add additional fields with defaults
    return NextResponse.json({
      ...artwork,
      dimensions: 'Contact for details',
      year: 2025,
      technique: 'Mixed media',
      inspiration: 'Inspired by the beauty of artistic expression',
      certificate_id: `TWA-${artwork.id.toString().padStart(4, '0')}`
    });
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artwork' },
      { status: 500 }
    );
  }
}
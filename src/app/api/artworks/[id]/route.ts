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

    // First, try to fetch with all new fields
    try {
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
          created_date,
          dimensions,
          year,
          technique,
          inspiration,
          certificate_id
        FROM artworks
        WHERE id = ${artworkId}
      `;

      if (artworks.length === 0) {
        return NextResponse.json(
          { error: 'Artwork not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(artworks[0]);
    } catch (dbError) {
      // If the new columns don't exist, fall back to basic fields
      console.warn('New columns not found, falling back to basic fields:', dbError);
      
      const artworks = await sql`
        SELECT 
          id,
          title,
          medium,
          src as image_path,
          available,
          preorder,
          COALESCE(like_count, 0) as likes
        FROM artworks
        WHERE id = ${artworkId}
      `;

      if (artworks.length === 0) {
        return NextResponse.json(
          { error: 'Artwork not found' },
          { status: 404 }
        );
      }

      // Add default values for missing fields
      const artwork = artworks[0];
      return NextResponse.json({
        ...artwork,
        story: 'This is a beautiful piece from my collection. Each artwork tells a unique story of creativity and artistic exploration.',
        dimensions: 'Contact for details',
        year: 2025,
        technique: 'Mixed media',
        inspiration: 'Inspired by the beauty of artistic expression',
        certificate_id: `TWA-${artwork.id.toString().padStart(4, '0')}`
      });
    }
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artwork' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    // Fetch artworks with their like counts from the like_count column
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
      ORDER BY id ASC
    `;

    return NextResponse.json(artworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
}
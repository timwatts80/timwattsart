import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { artworkId } = await request.json()

    if (!artworkId || typeof artworkId !== 'number') {
      return NextResponse.json(
        { error: 'Invalid artworkId' },
        { status: 400 }
      )
    }

    // Create a new like
    await sql`INSERT INTO artwork_likes (artwork_id) VALUES (${artworkId})`

    // Get the updated like count
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM artwork_likes 
      WHERE artwork_id = ${artworkId}
    `
    
    const likeCount = parseInt(result[0].count)

    return NextResponse.json({ 
      success: true, 
      likeCount 
    })

  } catch (error) {
    console.error('Error liking artwork:', error)
    return NextResponse.json(
      { error: 'Failed to like artwork' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const artworkId = searchParams.get('artworkId')

    if (artworkId) {
      // Get like count for specific artwork
      const result = await sql`
        SELECT COUNT(*) as count 
        FROM artwork_likes 
        WHERE artwork_id = ${parseInt(artworkId)}
      `
      
      const likeCount = parseInt(result[0].count)
      return NextResponse.json({ likeCount })
    } else {
      // Get like counts for all artworks
      const result = await sql`
        SELECT artwork_id, COUNT(*) as count 
        FROM artwork_likes 
        GROUP BY artwork_id
      `

      // Convert to object format { artworkId: count }
      const likeCounts: { [key: number]: number } = {}
      result.forEach((row: any) => {
        likeCounts[parseInt(row.artwork_id)] = parseInt(row.count)
      })

      return NextResponse.json({ 
        success: true, 
        likeCounts 
      })
    }

  } catch (error) {
    console.error('Error fetching likes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch likes' },
      { status: 500 }
    )
  }
}
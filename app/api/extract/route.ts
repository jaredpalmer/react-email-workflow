import { NextResponse } from 'next/server'
import { unfurl } from 'unfurl.js'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Extract metadata using unfurl
    const metadata = await unfurl(url)
    
    // Map unfurl response to our expected format
    return NextResponse.json({
      title: metadata.title || '',
      author: metadata.author || '',
      description: metadata.description || '',
      image: metadata.open_graph?.images?.[0]?.url || 
             metadata.twitter_card?.images?.[0]?.url || 
             metadata.favicon || 
             '',
      url: metadata.canonical_url || url
    })
  } catch (error) {
    console.error('Error extracting metadata:', error)
    return NextResponse.json(
      { error: 'Failed to extract metadata' },
      { status: 500 }
    )
  }
}
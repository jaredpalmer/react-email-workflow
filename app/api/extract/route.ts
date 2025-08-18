import { NextResponse } from 'next/server'
import { unfurl } from 'unfurl.js'

interface UnfurlMetadata {
  title?: string
  description?: string
  author?: string
  canonical_url?: string
  favicon?: string
  open_graph?: {
    images?: Array<{ url?: string }>
  }
  twitter_card?: {
    images?: Array<{ url?: string }>
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    let metadata: UnfurlMetadata = {}
    
    try {
      // Try to extract metadata using unfurl
      metadata = await unfurl(url) as UnfurlMetadata
    } catch (unfurlError) {
      // If unfurl fails, still try to extract what we can from the URL
      console.warn('Unfurl failed for URL:', url, unfurlError)
      metadata = {}
    }
    
    // Extract title and publication from the full title
    const fullTitle = metadata.title || ''
    let cleanTitle = fullTitle
    let publication = ''
    
    // Check for publication name after pipe character
    const pipeIndex = fullTitle.lastIndexOf(' | ')
    if (pipeIndex !== -1) {
      cleanTitle = fullTitle.substring(0, pipeIndex).trim()
      publication = fullTitle.substring(pipeIndex + 3).trim()
    }
    
    // Always try to get publication from the URL if not found in title
    if (!publication && url) {
      try {
        const urlObj = new URL(url)
        // Extract domain name without www and TLD
        const hostname = urlObj.hostname.replace(/^www\./, '')
        const domainParts = hostname.split('.')
        // Get the main domain name (not the TLD)
        publication = domainParts[domainParts.length - 2] || domainParts[0] || ''
        // Capitalize first letter
        if (publication) {
          publication = publication.charAt(0).toUpperCase() + publication.slice(1)
        }
      } catch {
        // Invalid URL, leave publication empty
      }
    }
    
    // Always return a response with whatever data we could extract
    // Use 'author' field to store the publication name
    return NextResponse.json({
      title: cleanTitle || '',
      author: publication || metadata.author || '',
      description: metadata.description || '',
      image: metadata.open_graph?.images?.[0]?.url || 
             metadata.twitter_card?.images?.[0]?.url || 
             metadata.favicon || 
             '',
      url: metadata.canonical_url || url
    })
  } catch (error) {
    // Only return 500 for actual server errors (JSON parsing, etc)
    console.error('Server error in extract API:', error)
    return NextResponse.json(
      { error: 'Server error processing request' },
      { status: 500 }
    )
  }
}
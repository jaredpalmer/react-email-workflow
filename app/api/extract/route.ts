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

// unfurl.js defaults to `User-Agent: facebookexternalhit`, which a growing number
// of sites (shellypalmer.com, openai.com, wsj.com) reject outright at their bot
// protection layer. A rejected fetch throws, and the route falls back to deriving
// the publication from the hostname — which is why a blocked link renders with no
// title, no description, and a source of "Shellypalmer" instead of "Shelly Palmer".
//
// Identify the app honestly instead of as the Facebook crawler. Note that unfurl
// *replaces* its default headers with whatever is passed here rather than merging,
// so `Accept` has to be repeated or the request stops asking for HTML.
const EXTRACT_HEADERS = {
  Accept: 'text/html, application/xhtml+xml',
  'User-Agent': 'spmail-linkpreview/1.0 (+https://shellypalmer.com)',
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
      metadata = await unfurl(url, { headers: EXTRACT_HEADERS }) as UnfurlMetadata
    } catch (unfurlError) {
      // The fetch itself failed — usually a bot-protection block (wsj.com sits
      // behind DataDome and answers 401 to every user agent, browser UAs
      // included) rather than a bad URL.
      //
      // Report that instead of returning 200 with blank fields. A hollow 200
      // looks like success to the client, which then overwrites the story's
      // Title / Description / Publication with empty strings and a publication
      // guessed from the hostname ("Wsj") — wiping anything the author typed by
      // hand and showing no error. Signalling failure lets the client keep those
      // fields intact so a blocked source can be filled in manually.
      console.warn('Unfurl failed for URL:', url, unfurlError)
      return NextResponse.json(
        { error: 'Could not fetch metadata for this URL' },
        { status: 502 }
      )
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
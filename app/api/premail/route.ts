import { NextResponse } from 'next/server'
import juice from 'juice'
import { createHTML } from '@/lib/email/createHTML'

export async function POST(request: Request) {
  try {
    const { elements, meta, presets, template } = await request.json()
    
    // Generate HTML using the ported createHTML function with template selection
    const html = createHTML({ elements, meta, presets, template })
    
    // Inline CSS using juice (keeping existing approach)
    const inlinedHTML = juice(html, { removeStyleTags: false })
    
    return NextResponse.json({ html: inlinedHTML })
  } catch (error) {
    console.error('Error generating email HTML:', error)
    return NextResponse.json(
      { error: 'Failed to generate email HTML' },
      { status: 500 }
    )
  }
}
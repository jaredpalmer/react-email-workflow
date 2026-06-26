import { NextResponse } from 'next/server'
import juice from 'juice'
import { createHTML } from '@/lib/email/createHTML'
import { addUtmToShellyPalmerLinks, campaignFromDate } from '@/lib/email/utm'

export async function POST(request: Request) {
  try {
    const { elements, meta, presets, template } = await request.json()

    // Generate HTML using the ported createHTML function with template selection
    const html = createHTML({ elements, meta, presets, template })

    // Inline CSS using juice (keeping existing approach)
    const inlinedHTML = juice(html, { removeStyleTags: false })

    // Tag every shellypalmer.com link with newsletter UTM params server-side,
    // using the issue date as the campaign. Existing query params are preserved.
    const taggedHTML = addUtmToShellyPalmerLinks(inlinedHTML, {
      campaign: campaignFromDate(meta?.date),
    })

    return NextResponse.json({ html: taggedHTML })
  } catch (error) {
    console.error('Error generating email HTML:', error)
    return NextResponse.json(
      { error: 'Failed to generate email HTML' },
      { status: 500 }
    )
  }
}
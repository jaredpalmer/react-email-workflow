// Server-side UTM tagging for outbound newsletter links.
//
// Every link that points at shellypalmer.com gets UTM params appended on the
// server so the person building the email never has to add them by hand. Two
// rules keep this safe and predictable:
//   1. Existing query params are preserved byte-for-byte — UTM tags are appended
//      to the original href, never re-serialized or replaced.
//   2. If a UTM param is already present on a link, the author's value wins and
//      we leave it untouched.
//
// This runs over the fully generated HTML (after juice), so it covers links
// from the header, story elements, markdown, and raw HTML alike. We only parse
// a decoded copy of each href to *inspect* it (host, scheme, which params
// already exist); the bytes we emit are the author's original href with the
// missing utm_* pairs string-appended. juice/cheerio preserves whatever
// ampersand form the source used (bare `&` or the `&amp;` entity), so the
// appended separators simply match the style already present on the link.

export interface UtmOptions {
  /** utm_source — defaults to "newsletter". */
  source?: string
  /** utm_medium — defaults to "email". */
  medium?: string
  /** utm_campaign — omitted entirely when not provided. */
  campaign?: string
}

const DEFAULT_SOURCE = 'newsletter'
const DEFAULT_MEDIUM = 'email'

/** Matches the apex domain and any subdomain (www, etc.), case-insensitively. */
const isShellyPalmerHost = (hostname: string): boolean => {
  // The WHATWG URL parser keeps a trailing dot on fully-qualified hosts
  // ("shellypalmer.com."); strip it so those links still match.
  const host = hostname.toLowerCase().replace(/\.$/, '')
  return host === 'shellypalmer.com' || host.endsWith('.shellypalmer.com')
}

const pad = (n: number): string => String(n).padStart(2, '0')
const formatYMD = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const isValidMonthDay = (month: number, day: number): boolean =>
  month >= 1 && month <= 12 && day >= 1 && day <= 31

/**
 * Derive a utm_campaign value from a newsletter issue date so every send is its
 * own campaign (e.g. "newsletter-2026-06-26"). That's what lets traffic be
 * sliced by issue in analytics.
 *
 * Parsing is done on the raw string for the two formats the app actually
 * produces (ISO `YYYY-MM-DD…` and en-US `M/D/YYYY`) to avoid timezone-driven
 * off-by-one-day shifts. Out-of-range or unparseable input falls back to today.
 */
export function campaignFromDate(dateInput?: string): string {
  if (dateInput) {
    const iso = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (iso && isValidMonthDay(Number(iso[2]), Number(iso[3]))) {
      return `newsletter-${iso[1]}-${iso[2]}-${iso[3]}`
    }

    const usLocale = dateInput.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
    if (usLocale && isValidMonthDay(Number(usLocale[1]), Number(usLocale[2]))) {
      const [, month, day, year] = usLocale
      return `newsletter-${year}-${pad(Number(month))}-${pad(Number(day))}`
    }

    const parsed = new Date(dateInput)
    if (!Number.isNaN(parsed.getTime())) return `newsletter-${formatYMD(parsed)}`
  }

  return `newsletter-${formatYMD(new Date())}`
}

/**
 * Append UTM params to a single href, or return null to signal "leave it as-is"
 * (non-shellypalmer hosts, non-http(s) schemes, unparseable URLs, or links that
 * already carry every UTM param).
 *
 * The href is parsed from a fully entity-decoded copy purely to read host /
 * scheme / existing param keys. The returned string is the *original* href with
 * the missing utm_* pairs concatenated on, so the author's existing query
 * string, encodings, host casing, and any HTML entities are preserved exactly.
 */
function tagHref(rawHref: string, params: Record<string, string>): string | null {
  // Decode HTML entities only to inspect the URL — never to emit it. juice may
  // leave ampersands bare or as "&amp;" depending on the source, so we reverse
  // the entity form before handing it to the URL parser; otherwise an existing
  // "&amp;utm_source=…" would be misread as a param named "amp;utm_source".
  const decoded = decodeAttrEntities(rawHref)

  let url: URL
  try {
    // Treat protocol-relative ("//host/…") as https for parsing only.
    url = new URL(decoded.startsWith('//') ? `https:${decoded}` : decoded)
  } catch {
    return null // relative paths, mailto:, tel:, #anchors, etc.
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
  if (!isShellyPalmerHost(url.hostname)) return null

  const missing = Object.entries(params).filter(([key]) => !url.searchParams.has(key))
  if (missing.length === 0) return null

  // Split off any fragment so params land before "#".
  const hashIndex = rawHref.indexOf('#')
  const base = hashIndex === -1 ? rawHref : rawHref.slice(0, hashIndex)
  const fragment = hashIndex === -1 ? '' : rawHref.slice(hashIndex)

  // Match the ampersand style already on the link; default to the valid "&amp;"
  // entity when there's nothing to match (no existing param separators).
  const amp = base.includes('&amp;') ? '&amp;' : base.includes('&') ? '&' : '&amp;'
  const queryIndex = base.indexOf('?')
  const connector = queryIndex === -1 ? '?' : queryIndex === base.length - 1 ? '' : amp

  const appended = missing.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join(amp)
  return `${base}${connector}${appended}${fragment}`
}

/** Decode the HTML entities that can legitimately appear in an href attribute value. */
function decodeAttrEntities(value: string): string {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*34;/g, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&#0*39;/g, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
}

/**
 * Rewrite every shellypalmer.com link in an HTML string to carry UTM params.
 * Non-matching links and attributes are returned byte-for-byte unchanged.
 */
export function addUtmToShellyPalmerLinks(html: string, options: UtmOptions = {}): string {
  const params: Record<string, string> = {
    utm_source: options.source ?? DEFAULT_SOURCE,
    utm_medium: options.medium ?? DEFAULT_MEDIUM,
  }
  if (options.campaign) params.utm_campaign = options.campaign

  // Match a standalone `href="…"`/`href='…'` attribute. The left boundary keeps
  // us off `data-href`/`xlink:href`, and excluding quotes and angle brackets
  // from the value stops a malformed (unterminated) href from swallowing the
  // markup that follows it.
  return html.replace(/(?<![\w-])href\s*=\s*(["'])([^"'<>]*)\1/gi, (match, quote: string, rawHref: string) => {
    const tagged = tagHref(rawHref, params)
    return tagged === null ? match : `href=${quote}${tagged}${quote}`
  })
}

import type { EmailElement, EmailMeta, EmailPreset } from '@/lib/atoms/editor'
import { marked } from 'marked'

// Configure marked for email-safe HTML
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return date.toLocaleDateString('en-US', options).toUpperCase()
}

const renderMarkdown = (content: string): string => {
  // Process markdown to HTML
  let html = marked.parse(content || '') as string
  
  // Add classes for CSS inlining by juice
  html = html.replace(/<p>/g, '<p class="markdown-p">')
  html = html.replace(/<ul>/g, '<ul class="markdown-ul">')
  html = html.replace(/<ol>/g, '<ol class="markdown-ol">')
  html = html.replace(/<li>/g, '<li class="markdown-li">')
  html = html.replace(/<blockquote>/g, '<blockquote class="markdown-blockquote">')
  html = html.replace(/<h1>/g, '<h1 class="markdown-h1">')
  html = html.replace(/<h2>/g, '<h2 class="markdown-h2">')
  html = html.replace(/<h3>/g, '<h3 class="markdown-h3">')
  html = html.replace(/<h4>/g, '<h4 class="markdown-h4">')
  html = html.replace(/<h5>/g, '<h5 class="markdown-h5">')
  html = html.replace(/<h6>/g, '<h6 class="markdown-h6">')
  html = html.replace(/<pre>/g, '<pre class="markdown-pre">')
  html = html.replace(/<code>/g, '<code class="markdown-code">')
  html = html.replace(/<hr>/g, '<hr class="markdown-hr">')
  
  // GitHub Flavored Markdown elements
  html = html.replace(/<table>/g, '<table class="markdown-table">')
  html = html.replace(/<thead>/g, '<thead class="markdown-thead">')
  html = html.replace(/<tbody>/g, '<tbody class="markdown-tbody">')
  html = html.replace(/<tr>/g, '<tr class="markdown-tr">')
  html = html.replace(/<th>/g, '<th class="markdown-th">')
  html = html.replace(/<td>/g, '<td class="markdown-td">')
  html = html.replace(/<del>/g, '<del class="markdown-del">')
  html = html.replace(/<input type="checkbox"/g, '<input type="checkbox" class="markdown-checkbox"')
  
  return html
}

const renderElements = (elements: EmailElement[]): string => {
  return elements
    .map((element) => {
      switch (element.kind) {
        case 'url':
          const cta = 'Read More'
          return `<h3><a class="story-title" href="${element.url || '#'}">${element.title || 'Untitled'}</a></h3>
            <p class="story-excerpt"><a class="story-excerpt-link" href="${element.url || '#'}">${element.description || element.content || ''}</a></p>
            <p class="story-author"><a class="story-author-link" href="${element.url || '#'}">${cta}<span class="more"> · ${element.author || ''}</span></a></p>`
        case 'markdown':
          return `<div class="markdown-content">${renderMarkdown(element.content || '')}</div>`
        case 'html':
          return element.content || ''
        default:
          return ''
      }
    })
    .join(' ')
}

export function createHTML({ 
  elements, 
  meta, 
  presets 
}: { 
  elements: EmailElement[], 
  meta: EmailMeta,
  presets?: EmailPreset[]
}): string {
  // Get the active preset from meta.presetId
  const activePreset = presets?.find(p => p.id === meta.presetId)
  const preset = activePreset ? {
    title: activePreset.title,
    url: activePreset.url,
    subtitle: activePreset.subtitle,
  } : {
    title: 'ShellyPalmer',
    url: 'https://www.shellypalmer.com',
    subtitle: 'Think about this',
  }

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${meta.subject || ''}</title>
    <style type="text/css">
    .btn {
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      -premailer-width: 100%;
      width: 100%;
    }
    .btn > tr > td {
      padding-bottom: 15px;
    }
    .btn table {
      -premailer-cellpadding: 0;
      -premailer-cellspacing: 0;
      -premailer-width: auto;
      width: auto;
    }
    .btn table td {
      background-color: #fff;
      border-radius: 5px;
      text-align: center;
    }
    .btn a {
      background-color: #fff;
      border: solid 1px #0070ff;
      border-radius: 5px;
      color: #0070ff;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      margin: 0;
      padding: 12px 25px;
      text-decoration: none;
    }
    .btn-primary table td {
      background-color: #0070ff;
    }
    .btn-primary a {
      background-color: #0070ff;
      border-color: #0050dd;
      color: #fff;
    }
    #outlook a {
      padding: 0;
    }
    body {
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #141823;
      background-color: #ffffff;
    }
    .ExternalClass {
      width: 100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }
    #backgroundTable {
      margin: 0;
      padding: 10px;
      width: 100% !important;
      line-height: 100% !important;
    }
    body {
      -webkit-font-smoothing: antialiased;
      font-size: 14px;
      height: 100% !important;
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    h1,
    h2,
    h3,
    h4 {
      color: #141823 !important;
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-weight: bold;
      line-height: 1.4em;
      margin: 0;
      margin-bottom: 6px;
    }
    h1 {
      font-size: 38px;
      font-weight: 300;
    }
    h2 {
      font-size: 24px;
    }
    h3 {
      font-size: 20px;
    }
    h4 {
      font-size: 14px;
      font-weight: 500;
    }
    p,
    ul,
    ol {
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: normal;
      margin: 0;
      margin-bottom: 16px;
      line-height: 24px;
      color: #141823;
    }
    a {
      color: #0070ff;
      text-decoration: underline;
    }
    .story-title {
      text-decoration: none;
      color: #141823;
    }
    .story-excerpt {
      margin-bottom: 6px;
    }
    .story-excerpt-link {
      text-decoration: none;
      color: #595f6c;
    }
    .story-author {
      margin-bottom: 36px;
    }
    .story-author-link {
      text-decoration: none;
      color: #0070ff;
    }
    .story-author .more {
      color: #595f6c;
    }
    .logo {
      color: #141823;
      font-size: 38px;
      letter-spacing: -0.03em;
      text-decoration: none;
      font-weight: bold;
      display: block;
      margin-top: 24px;
      margin-bottom: 6px;
      line-height: 1;
    }
    .tagline {
      display: block;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 8px;
      color: #0070ff;
    }
    .date {
      color: #595f6c;
      font-size: 14px;
      text-transform: uppercase;
      margin: 24px 0;
      display: block;
      letter-spacing: 0.08em;
    }
    .fine-print {
      font-size: 11px;
      color: #b7b7b7;
      line-height: 1.1;
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .fine-print a {
      font-size: 11px;
      line-height: 1.1;
      color: #0070ff;
    }
    .markdown-content {
      margin-bottom: 36px;
    }
    .markdown-p {
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: normal;
      margin: 0;
      margin-bottom: 16px;
      line-height: 24px;
      color: #595f6c;
    }
    .markdown-ul,
    .markdown-ol {
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: normal;
      margin: 0;
      margin-bottom: 16px;
      line-height: 24px;
      color: #595f6c;
      padding-left: 20px;
    }
    .markdown-li {
      margin-bottom: 8px;
      line-height: 24px;
      color: #595f6c;
    }
    .markdown-blockquote {
      border-left: 3px solid #0070ff;
      padding-left: 16px;
      margin: 16px 0;
      color: #595f6c;
      font-style: italic;
    }
    .markdown-h1 {
      font-size: 32px;
      font-weight: bold;
      color: #141823;
      margin: 0;
      margin-bottom: 16px;
      line-height: 1.4em;
      letter-spacing: -0.01em;
    }
    .markdown-h2 {
      font-size: 24px;
      font-weight: bold;
      color: #141823;
      margin: 0;
      margin-bottom: 12px;
      line-height: 1.4em;
      letter-spacing: -0.01em;
    }
    .markdown-h3 {
      font-size: 20px;
      font-weight: bold;
      color: #141823;
      margin: 0;
      margin-bottom: 10px;
      line-height: 1.4em;
    }
    .markdown-h4 {
      font-size: 16px;
      font-weight: bold;
      color: #141823;
      margin: 0;
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .markdown-h5 {
      font-size: 14px;
      font-weight: bold;
      color: #141823;
      margin: 0;
      margin-bottom: 6px;
      line-height: 1.4;
    }
    .markdown-h6 {
      font-size: 12px;
      font-weight: bold;
      color: #141823;
      margin: 0;
      margin-bottom: 4px;
      line-height: 1.4;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .markdown-content a {
      color: #0070ff;
      text-decoration: underline;
    }
    .markdown-code {
      background-color: #f4f4f4;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 14px;
    }
    .markdown-pre {
      background-color: #f4f4f4;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
      margin-bottom: 16px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 14px;
      line-height: 1.4;
    }
    .markdown-pre .markdown-code {
      background-color: transparent;
      padding: 0;
    }
    .markdown-hr {
      background-color: #eee;
      border: none;
      height: 1px;
      margin: 24px 0;
    }
    .markdown-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 14px;
    }
    .markdown-thead {
      background-color: #f6f8fa;
    }
    .markdown-th {
      padding: 8px 12px;
      border: 1px solid #d1d5da;
      text-align: left;
      font-weight: 600;
      color: #141823;
    }
    .markdown-td {
      padding: 8px 12px;
      border: 1px solid #d1d5da;
      color: #141823;
    }
    .markdown-tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .markdown-del {
      text-decoration: line-through;
      color: #595f6c;
    }
    .markdown-checkbox {
      margin-right: 6px;
    }
    .markdown-content img {
      max-width: 100%;
      height: auto;
      margin: 16px 0;
    }
    .preheader {
      color: transparent;
      display: none;
      height: 0;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      mso-hide: all;
      visibility: hidden;
      width: 0;
    }
    hr {
      background-color: #eee;
      color: #eee;
      border: 1px solid #eee;
      margin: 48px auto;
      width: 50px;
    }
    .bodyImage {
      height: auto !important;
      max-width: 498px !important;
      width: 100% !important;
      margin-bottom: 16px;
    }
    @media only screen and (max-width: 480px) {
      .bodyImage {
        height: auto !important;
        max-width: 498px !important;
        width: 100% !important;
        margin-bottom: 16px;
      }
    }
    </style>
  </head>
  <body>
    <table cellpadding="0" cellspacing="0" border="0" id="backgroundTable">
      <tbody>
        <tr>
          <td width="500" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" align="center">
              <tbody>
                <tr>
                  <td width="498" class="container" valign="top">
                    <table>
                    </table>
                      <span class="preheader">${meta.preheader || ''}</span>
                      <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                          <td width="498" class="container" align="center">
                            <h1><a class="logo" href="${preset.url}">${preset.title}</a></h1>
                            <p class="tagline">${preset.subtitle}</p>
                            <p class="date">${formatDate(meta.date || new Date().toISOString())}</p>
                          </td>
                        </tr>
                      </table>
                      <table class="main">
                        <tr>
                          <td class="wrapper">
                            <table>
                              <tr>
                                <td>
                                 ${renderElements(elements)}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
  </html>`

  return html
}
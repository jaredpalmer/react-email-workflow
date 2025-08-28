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

const createChatGPTPrompt = (title: string, url: string): string => {
  return `Based on what you know about me from previous chats, tell me more about this:\n\n"${title}"\n${url}`
//   return `\
// <context>
//   <title>${title}</title>
//   <link>${url}</link>
// </context> 
// <instruction>
//   You are an business and tech expert talking to a broad audience of business executives.
//   Research and familiarize yourself with the above topic in <context>, then write an Axios-style article about the topic followed by suggested additional reading.
//   Cite your sources. Do not include any other text in your response except the report. Do not reference this prompt in any way. 
//   Remember, you are writing for business executives who want more info about a topic or news event.
// </instruction>`
}

const createChatGPTLink = (title: string, url: string): string => {
  const prompt = createChatGPTPrompt(title || 'this article', url || '')
  return encodeURI(`https://chatgpt.com/?q=${prompt}`)
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
    .map((element, index) => {
      // Check if this is the last URL element in a consecutive group
      const isLastUrlInGroup = element.kind === 'url' && 
        (index === elements.length - 1 || elements[index + 1]?.kind !== 'url') &&
        index > 0 && elements[index - 1]?.kind === 'url';
      
      switch (element.kind) {
        case 'url':
          // Modern story structure with better spacing
          return `
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <tr>
                <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600; line-height: 1.3; mso-line-height-rule: exactly;">
                    ${element.title || 'Untitled'}
                  </h3>
                  <p style="margin: 0 0 8px 0; font-size: 16px; line-height: 1.5; color: #666666; mso-line-height-rule: exactly;">
                    ${element.description || element.content || ''}
                  </p>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                    <tr>
                      <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 14px; color: #999999;">                        
                        <a href="${createChatGPTLink(element.title || '', element.url || '')}" style="color: #0070ff; text-decoration: none;" target="_blank">Open in ChatGPT ›</a>
                      </td>
                      <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: right; font-size: 14px; color: #999999;">
                        ${element.author ? `<a href="${element.url || '#'}" style="color: #999999; text-decoration: none;" target="_blank">Source: ${element.author}</a>` : ''}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              ${!isLastUrlInGroup ? `<!-- Spacer row for consistent vertical spacing in Outlook -->
              <tr>
                <td height="30" style="font-size: 0; line-height: 0; mso-line-height-rule: exactly;">&nbsp;</td>
              </tr>` : ''}
            </table>`
        case 'markdown':
          return `
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <tr>
                <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  ${renderMarkdown(element.content || '')}
                </td>
              </tr>             
            </table>`
        case 'html':
          return `
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <tr>
                <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  ${element.content || ''}
                </td>
              </tr>            
            </table>`
        default:
          return ''
      }
    })
    .join('')
}

export function createNewTemplate({ 
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

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${meta.subject || ''}</title>
    <!--[if mso]>
    <style type="text/css">
    body, table, td, a { font-family: Arial, sans-serif !important; }
    table { border-collapse: collapse; }
    </style>
    <![endif]-->
    <style type="text/css">
    /* Removed button styles as per requirement */
    #outlook a {
      padding: 0;
    }
    body {
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #111111;
      background-color: #ffffff;
      mso-line-height-rule: exactly;
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
    /* Container styles */
    .container {
      width: 100%;
      max-width: 550px;
    }
    .padding {
      padding: 0 20px;
    }
    .padding-v-30 {
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .padding-h-20 {
      padding-left: 20px;
      padding-right: 20px;
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
      color: #111111 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-weight: 600;
      line-height: 1.3;
      margin: 0;
      mso-line-height-rule: exactly;
    }
    h1 {
      font-size: 40px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    p,
    ul,
    ol {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      margin-bottom: 16px;
      line-height: 1.5;
      color: #111111;
      mso-line-height-rule: exactly;
    }
    a {
      color: #0070ff;
      text-decoration: none;
    }
    /* Gmail blue link prevention */
    u + #body a {
      color: inherit;
      text-decoration: none;
    }
    h1 a,
    h2 a,
    h3 a,
    h4 a,
    h5 a,
    h6 a {
      color: inherit;
      text-decoration: none;
    }
    /* Removed old story classes - now using inline styles */
    .logo {
      color: #111111;
      font-size: 40px;
      letter-spacing: -0.02em;
      text-decoration: none;
      font-weight: bold;
      display: block;
      margin-top: 30px;
      margin-bottom: 10px;
      line-height: 1.2;
      mso-line-height-rule: exactly;
    }
    .tagline {
      display: block;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 8px;
      color: #0070ff;
      font-weight: 400;
    }
    .date {
      color: #999999;
      font-size: 12px;
      text-transform: uppercase;
      margin: 20px 0 30px 0;
      display: block;
      letter-spacing: 0.06em;
      font-weight: 400;
    }
    .fine-print {
      font-size: 12px;
      color: #999999;
      line-height: 1.4;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .fine-print a {
      font-size: 12px;
      line-height: 1.4;
      color: #0070ff;
    }
    /* Markdown content now wrapped in tables */
    .markdown-p {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      margin-bottom: 16px;
      line-height: 1.5;
      color: #666666;
      mso-line-height-rule: exactly;
    }
    .markdown-ul,
    .markdown-ol {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      margin-bottom: 16px;
      margin-left: 20px;
      line-height: 1.5;
      color: #666666;
      mso-line-height-rule: exactly;
    }
    .markdown-li {
      margin-bottom: 8px;
      line-height: 1.5;
      color: #666666;
    }
    .markdown-blockquote {
      border-left: 3px solid #0070ff;
      margin: 16px 0 16px 16px;
      color: #666666;
      font-style: italic;
    }
    .markdown-h1 {
      font-size: 32px;
      font-weight: 600;
      color: #111111;
      margin: 0;
      margin-bottom: 16px;
      line-height: 1.3;
      letter-spacing: -0.01em;
      mso-line-height-rule: exactly;
    }
    .markdown-h2 {
      font-size: 24px;
      font-weight: 600;
      color: #111111;
      margin: 0;
      margin-bottom: 12px;
      line-height: 1.3;
      letter-spacing: -0.01em;
      mso-line-height-rule: exactly;
    }
    .markdown-h3 {
      font-size: 20px;
      font-weight: 600;
      color: #111111;
      margin: 0;
      margin-bottom: 10px;
      line-height: 1.3;
      mso-line-height-rule: exactly;
    }
    .markdown-h4 {
      font-size: 16px;
      font-weight: 600;
      color: #111111;
      margin: 0;
      margin-bottom: 8px;
      line-height: 1.3;
      mso-line-height-rule: exactly;
    }
    .markdown-h5 {
      font-size: 14px;
      font-weight: 600;
      color: #111111;
      margin: 0;
      margin-bottom: 6px;
      line-height: 1.3;
      mso-line-height-rule: exactly;
    }
    .markdown-h6 {
      font-size: 12px;
      font-weight: 600;
      color: #111111;
      margin: 0;
      margin-bottom: 4px;
      line-height: 1.3;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      mso-line-height-rule: exactly;
    }
    .markdown-content a {
      color: #0070ff;
      text-decoration: none;
    }
    .markdown-h1 a,
    .markdown-h2 a,
    .markdown-h3 a,
    .markdown-h4 a,
    .markdown-h5 a,
    .markdown-h6 a {
      color: inherit;
      text-decoration: none;
    }
    .markdown-code {
      background-color: #f7f7f7;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 14px;
    }
    .markdown-pre {
      background-color: #f7f7f7;
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
      background-color: #dddddd;
      border: none;
      height: 1px;
      margin: 20px 0;
    }
    .markdown-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-family: -apple-system,BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 14px;
    }
    .markdown-thead {
      background-color: #f7f7f7;
    }
    .markdown-th {
      padding: 8px 12px;
      border: 1px solid #dddddd;
      text-align: left;
      font-weight: 600;
      color: #111111;
    }
    .markdown-td {
      padding: 8px 12px;
      border: 1px solid #dddddd;
      color: #111111;
    }
    .markdown-tr:nth-child(even) {
      background-color: #f7f7f7;
    }
    .markdown-del {
      text-decoration: line-through;
      color: #999999;
    }
    .markdown-checkbox {
      margin-right: 6px;
    }
    .markdown-content img {
      max-width: 100%;
      height: auto;
      margin: 16px 0;
    }
    img {
      max-width: 550px;
    }
    /* Preheader optimization moved to HTML */
    .preheader {
      color: transparent;
      display: none !important;
      font-size: 0px;
      line-height: 0px;
      max-height: 0px;
      max-width: 0px;
      opacity: 0;
      overflow: hidden;
      visibility: hidden;
      mso-hide: all;
    }
    hr {
      background-color: #dddddd;
      border: none;
      height: 1px;
      margin: 40px auto;
      width: 60px;
    }
    .bodyImage {
      height: auto !important;
      max-width: 498px !important;
      width: 100% !important;
      margin-bottom: 16px;
    }
    /* Mobile responsive styles */
    @media only screen and (max-width: 480px) {
      .container {
        width: 100% !important;
      }
      .padding {
        padding: 0 10px !important;
      }
      h1 {
        font-size: 32px !important;
      }
      .logo {
        font-size: 32px !important;
      }
      img {
        max-width: 100% !important;
      }
      .bodyImage {
        width: 100% !important;
        max-width: 100% !important;
      }
    }
    </style>
  </head>
  <body id="body" style="margin: 0;">
    <!-- Preheader text optimized for inbox preview -->
    <div style="color: transparent; visibility: hidden; opacity: 0; font-size: 0px; border: 0; max-height: 1px; width: 1px; margin: 0px; border-width: 0px !important; display: none !important; line-height: 0px !important;">
      <span>${meta.preheader || meta.subject || ''}</span>
      &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
      &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
    </div>
    
    <!-- Outer table for centering in Outlook -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      <tr>
        <td align="center" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
          <!--[if mso]>
          <center>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="550">
            <tr>
              <td align="center">
          <![endif]-->
          <!-- Main wrapper table -->
          <table id="wrapper" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="-webkit-font-smoothing: antialiased; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; max-width: 550px; width: 100% !important; margin: 0 auto;">
      <tr>
        <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="container" style="border-collapse: collapse;">
            <!-- Header -->
            <tr>
              <td align="center" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" class="padding-v-30 padding-h-20">
                <h1><a class="logo" href="${preset.url}">${preset.title}</a></h1>
                <p class="tagline">${preset.subtitle}</p>
                <p class="date">${formatDate(meta.date || new Date().toISOString())}</p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" class="padding">
                ${renderElements(elements)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
          </table>
          <!--[if mso]>
              </td>
            </tr>
          </table>
          </center>
          <![endif]-->
        </td>
      </tr>
    </table>
  </body>
  </html>`

  return html
}
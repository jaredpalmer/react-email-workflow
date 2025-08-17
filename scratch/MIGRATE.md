# React Email Workflow Migration Plan

## Executive Summary
Migrating a legacy React email builder (2015-2016) from React 15 + Redux + Express + RabbitMQ to modern Next.js 15.4 with TypeScript. Focus on 1:1 feature parity, no new features.

## Current Architecture Analysis

### Tech Stack (Legacy)
- **Frontend**: React 15.3, Redux 3.5, React-DnD 2.1, JSXStyle
- **Backend**: Express 4.14, Node 14.17
- **Message Queue**: RabbitMQ (via jackrabbit)
- **Services**: Microservice architecture (premail, extract)
- **Build**: Webpack 1.13, Babel 6
- **Storage**: Browser localStorage
- **CSS Processing**: Juice (inline CSS), Premailer API

### Core Features
1. **Drag & Drop Email Builder**: Reorder email components
2. **Component Types**: URL/Story (with meta extraction), Heading, Text, HTML (CodeMirror)
3. **Live Preview**: Visual and HTML code views
4. **CSS Inlining**: Automatic inline styles for email compatibility
5. **Meta Extraction**: Fetch and display URL metadata
6. **Copy to Clipboard**: Copy generated HTML
7. **Auto-save**: Via localStorage

## New Architecture Design

### Tech Stack (Modern)
- **Framework**: Next.js 15.4 with App Router
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **State Management**: Jotai (atomic state management)
- **Drag & Drop**: @dnd-kit/sortable (modern, accessible, performant)
- **Code Editor**: CodeMirror 6 (lightweight, performant)
- **CSS Processing**: juice (keep existing implementation)
- **Deployment**: Vercel (serverless functions)
- **Storage**: localStorage (keeping it simple)
- **Type Safety**: TypeScript throughout

## Implementation Plan

### Core Dependencies
```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "jotai": "^2.10.3",
    "juice": "^11.0.0",
    "@uiw/react-codemirror": "^4.23.6",
    "@codemirror/lang-html": "^6.4.9",
    "metascraper": "^5.45.0",
    "swr": "^2.2.5",
    "clipboard": "^2.0.11"
  }
}
```

### Components to Port (1:1 conversion)

**Elements:**
- Url.js → url.tsx (story with metadata)
- Heading.js → heading.tsx
- Text.js → text.tsx 
- Code.js → html-editor.tsx (with CodeMirror)

**Core:**
- ElementList.js → element-list.tsx
- Card.js → draggable-card.tsx
- Meta.js → email-meta.tsx (subject/preheader)
- Preview.js → preview.tsx
- PreviewHTML.js → html-view.tsx
- PreviewVisual.js → iframe-preview.tsx

### API Routes (Simple port)

```typescript
// app/api/premail/route.ts
export async function POST(request: Request) {
  const { elements, meta } = await request.json()
  const html = createHTML({ elements, meta }) // Direct port of existing
  const inlined = juice(html, { removeStyleTags: false })
  return Response.json({ html: inlined })
}

// app/api/extract/route.ts  
export async function POST(request: Request) {
  const { url } = await request.json()
  const metadata = await metascraper({ url })
  return Response.json(metadata)
}
```

### State Management

```typescript
// Simple Jotai atoms replacing Redux
export const elementsAtom = atom<Element[]>([])
export const metaAtom = atom({ subject: '', preheader: '' })
export const previewModeAtom = atom<'visual' | 'html'>('visual')

// localStorage persistence
export const elementsAtomWithStorage = atomWithStorage('elements', [])
```

## Key Differences from Legacy

1. **No RabbitMQ** - Direct API calls
2. **No Redux** - Jotai atoms
3. **No React-DnD** - @dnd-kit
4. **No JSXStyle** - Tailwind CSS
5. **No webpack config** - Next.js built-in
6. **TypeScript** - Type safety throughout

## Implementation Steps

1. **Port existing components to TypeScript**
2. **Replace Redux with Jotai (minimal changes)**
3. **Replace React-DnD with @dnd-kit**
4. **Port API endpoints (remove RabbitMQ)**
5. **Keep localStorage as-is**
6. **Preserve exact email HTML output**
7. **Deploy to Vercel**

## What We're NOT Changing

- Email HTML generation logic (keep createHTML.js logic)
- localStorage data structure
- Component functionality
- CSS inlining approach (juice)
- Basic UI/UX flow

## Summary

Straightforward port of existing React email builder to Next.js 15.4 with modern tooling. Focus on maintaining exact feature parity while updating deprecated dependencies. No new features, just modernization.
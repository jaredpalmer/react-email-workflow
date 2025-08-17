# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (uses Turbopack for faster builds)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
```

## Architecture Overview

This is an email builder application built with Next.js 15.4 and TypeScript. It provides a drag-and-drop interface for creating HTML emails with live preview capabilities.

### Tech Stack
- **Framework**: Next.js 15.4 with App Router
- **State Management**: Jotai (atomic state management)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Drag & Drop**: @dnd-kit
- **Code Editor**: CodeMirror 6
- **Email CSS**: juice for CSS inlining
- **Markdown Processing**: marked with GitHub Flavored Markdown support

### Core Architecture

The application follows a client-side state management pattern with Jotai atoms stored in `lib/atoms/editor.ts`:

- `elementsAtom`: Array of email elements (URL, HTML, markdown)
- `metaAtom`: Email metadata (subject, preheader, date, presetId)
- `presetsAtom`: Email template presets (name, title, URL, subtitle)
- UI state atoms for preview mode, expanded elements, and loading states

### Key Components

**Email Builder UI** (`components/email-builder/`):

- `editor-panel.tsx`: Left panel with element controls and metadata inputs
- `preview-panel.tsx`: Right panel with visual/HTML preview
- `element-list.tsx`: Sortable list of email elements with drag-and-drop
- `preset-manager.tsx`: CRUD operations for email presets
- `elements/`: Individual element components (HTML, URL, markdown)

**API Routes** (`app/api/`):

- `/api/premail`: Generates email HTML with inlined CSS using juice
- `/api/extract`: Fetches URL metadata for story elements using unfurl.js

**Email Generation** (`lib/email/createHTML.ts`):

- Template generation logic preserved from legacy system
- Maintains compatibility with existing email templates
- Supports markdown rendering with custom CSS classes for email clients

### Element Types

1. **Story/URL**: Fetches and displays URL metadata (title, description, author)
2. **HTML**: Custom HTML with CodeMirror editor
3. **Markdown**: Rich text with full GFM support (tables, strikethrough, task lists)

### Development Notes

- Always use `pnpm` and `pnpx` for package management
- Path alias `@/` maps to project root
- TypeScript strict mode is enabled
- The project was migrated from a legacy React 15 + Redux application
- Email HTML generation logic in `createHTML.ts` must maintain backward compatibility
- All state persistence uses localStorage via Jotai's `atomWithStorage`
- Markdown content is processed through marked.js with custom CSS classes for email compatibility

# Email Builder Migration TODO

## Phase 1: Setup & Dependencies ✅
- [x] Install core dependencies
  - [x] @dnd-kit/core and @dnd-kit/sortable
  - [x] jotai for state management
  - [x] juice for CSS inlining
  - [x] @uiw/react-codemirror and @codemirror/lang-html
  - [x] metascraper for URL metadata
  - [x] swr for data fetching
  - [x] clipboard for copy functionality

## Phase 2: Core Structure
- [x] Create app structure
  - [x] app/email-builder/page.tsx - main page
  - [x] app/email-builder/layout.tsx - layout wrapper
  - [x] lib/atoms/editor.ts - Jotai atoms
  - [x] lib/email/createHTML.ts - port email generation

## Phase 3: Components Migration
### Layout Components
- [x] Header component with blue bar
- [x] Two-column layout (editor + preview)

### Editor Components (Left Side)
- [x] Meta component (subject, preheader, date)
- [x] URL input with fetch button
- [x] Element buttons (Story, Heading, Text, HTML)
- [x] Draggable element list

### Preview Components (Right Side)
- [x] Preview header with buttons (Copy, Refresh, Show HTML)
- [x] Visual preview (iframe)
- [x] HTML preview (code view)

### Element Components
- [x] Story/URL component with metadata
- [x] Heading component
- [x] Text component
- [x] HTML/Code component with CodeMirror

## Phase 4: State Management
- [x] Port Redux state to Jotai atoms
  - [x] elementsAtom - array of email elements
  - [x] metaAtom - subject, preheader, date
  - [x] previewModeAtom - 'visual' | 'html'
  - [x] premailAtom - generated HTML
- [x] localStorage persistence (via atomWithStorage)

## Phase 5: API Routes
- [x] /api/premail - generate inlined HTML
- [x] /api/extract - fetch URL metadata

## Phase 6: Drag & Drop
- [x] Replace React-DnD with @dnd-kit
- [x] Sortable element list
- [x] Maintain drag handles and UX

## Phase 7: Polish
- [x] Style with Tailwind + shadcn/ui
- [x] Maintain blue header (#2B7CE9 from screenshot)
- [ ] Responsive layout
- [ ] Dark mode support
- [x] Add delete element icon/button to cards
- [x] Add nuke/reset functionality
- [x] Fix Story/URL component with in-card fetch functionality
- [x] Replace metascraper with unfurl.js (lighter, fewer dependencies)
- [ ] Test with various email elements
- [ ] Fine-tune styles to match original

## Current Status
✅ Core migration complete! The email builder has been successfully ported to Next.js 15.4 with:
- Modern stack: TypeScript, Tailwind CSS, shadcn/ui
- State management: Jotai with localStorage persistence
- Drag & Drop: @dnd-kit replacing React-DnD
- API Routes: Next.js App Router replacing Express/RabbitMQ
- Email generation: Original createHTML logic preserved

## Remaining Tasks
- Fine-tune UI/UX to match original design more closely
- Add responsive design for mobile
- Test thoroughly with various email templates
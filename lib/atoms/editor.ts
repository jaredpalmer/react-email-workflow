import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Types
export interface EmailElement {
  id: string
  kind: 'url' | 'html' | 'markdown'
  content?: string
  title?: string
  url?: string
  author?: string
  description?: string
  image?: string
}

export interface EmailMeta {
  subject: string
  preheader: string
  date: string
  presetId?: string
}

export interface EmailPreset {
  id: string
  name: string
  title: string
  url: string
  subtitle: string
  isDefault?: boolean
}

// Atoms with localStorage persistence
export const elementsAtom = atomWithStorage<EmailElement[]>('elements', [])
export const metaAtom = atomWithStorage<EmailMeta>('meta', {
  subject: '',
  preheader: '',
  date: new Date().toLocaleDateString('en-US'),
  presetId: 'default'
})

// Preset atoms
export const presetsAtom = atomWithStorage<EmailPreset[]>('emailPresets', [
  {
    id: 'default',
    name: 'ShellyPalmer',
    title: 'ShellyPalmer',
    url: 'https://www.shellypalmer.com',
    subtitle: 'Think about this',
    isDefault: true
  }
])

// UI state atoms
export const previewModeAtom = atom<'visual' | 'html'>('visual')
export const isDraggingAtom = atom(false)
export const isLoadingAtom = atom(false)
export const premailHtmlAtom = atom<string>('')
export const hasCopiedAtom = atom(false)
export const expandedElementIdAtom = atom<string | null>(null)
export const newlyAddedElementIdAtom = atom<string | null>(null)

// Element schemas (matching legacy ElementSchema.js)
export const elementSchemas = {
  url: {
    kind: 'url',
    title: '',
    url: '',
    content: '',
    author: '',
    description: '',
    image: ''
  },
  html: {
    kind: 'html',
    content: ''
  },
  markdown: {
    kind: 'markdown',
    content: ''
  }
} as const
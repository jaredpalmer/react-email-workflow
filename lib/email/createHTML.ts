import type { EmailElement, EmailMeta, EmailPreset } from '@/lib/atoms/editor'
import { createOldTemplate } from './templates/old-template'
import { createNewTemplate } from './templates/new-template'

export type TemplateType = 'old' | 'new'

export function createHTML({ 
  elements, 
  meta, 
  presets,
  template = 'new'
}: { 
  elements: EmailElement[], 
  meta: EmailMeta,
  presets?: EmailPreset[],
  template?: TemplateType
}): string {
  if (template === 'old') {
    return createOldTemplate({ elements, meta, presets })
  }
  
  return createNewTemplate({ elements, meta, presets })
}
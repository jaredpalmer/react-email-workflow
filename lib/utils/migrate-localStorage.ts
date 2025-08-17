import type { EmailElement, EmailMeta } from '@/lib/atoms/editor'

/**
 * Migrates localStorage data from old Redux format to new Jotai format
 * Old format: localStorage['state'] = { elements: [...], meta: {...} }
 * New format: localStorage['elements'] = [...], localStorage['meta'] = {...}
 */
export function migrateLocalStorage(): void {
  try {
    // Check if old Redux state exists
    const oldStateStr = localStorage.getItem('state')
    if (!oldStateStr) return

    // Check if new format already exists (don't overwrite)
    const existingElements = localStorage.getItem('elements')
    const existingMeta = localStorage.getItem('meta')
    if (existingElements || existingMeta) {
      console.log('New format data already exists, skipping migration')
      return
    }

    // Parse old state
    const oldState = JSON.parse(oldStateStr)
    if (!oldState.elements && !oldState.meta) {
      console.log('Invalid old state structure, skipping migration')
      return
    }

    // Migrate elements (only url and html kinds)
    if (oldState.elements && Array.isArray(oldState.elements)) {
      const migratedElements: EmailElement[] = oldState.elements
        .filter((el: any) => el.kind === 'url' || el.kind === 'html')
        .map((el: any) => ({
          id: el.id,
          kind: el.kind,
          content: el.content,
          title: el.title,
          url: el.url,
          author: el.author,
          description: el.description,
          image: el.image
        }))
      
      localStorage.setItem('elements', JSON.stringify(migratedElements))
      console.log(`Migrated ${migratedElements.length} elements (url and html only)`)
    }

    // Migrate meta
    if (oldState.meta) {
      const migratedMeta: EmailMeta = {
        subject: oldState.meta.subject || '',
        preheader: oldState.meta.preheader || '',
        date: oldState.meta.date || new Date().toLocaleDateString('en-US'),
        presetId: oldState.meta.presetId || 'default'
      }
      
      localStorage.setItem('meta', JSON.stringify(migratedMeta))
      console.log('Migrated meta data')
    }

    // Optionally remove old state after successful migration
    // Uncomment the line below if you want to clean up old data
    // localStorage.removeItem('state')
    
    console.log('localStorage migration completed successfully')
  } catch (error) {
    console.error('Failed to migrate localStorage:', error)
  }
}
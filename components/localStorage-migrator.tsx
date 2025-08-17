'use client'

import { useEffect } from 'react'
import { migrateLocalStorage } from '@/lib/utils/migrate-localStorage'

export function LocalStorageMigrator() {
  useEffect(() => {
    migrateLocalStorage()
  }, [])

  return null
}
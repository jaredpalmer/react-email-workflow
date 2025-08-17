'use client'

import { useState } from 'react'
import { Link } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { EmailElement } from '@/lib/atoms/editor'

interface UrlElementProps {
  element: EmailElement
  onUpdate: (id: string, updates: Partial<EmailElement>) => void
}

export function UrlElement({ element, onUpdate }: UrlElementProps) {
  const [urlInput, setUrlInput] = useState(element.url || '')
  const [fetching, setFetching] = useState(false)

  const handleFetch = async () => {
    if (!urlInput.trim()) return
    
    setFetching(true)
    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput })
      })
      
      if (response.ok) {
        const metadata = await response.json()
        onUpdate(element.id, {
          url: urlInput,
          title: metadata.title || '',
          author: metadata.author || '',
          description: metadata.description || '',
          content: metadata.description || '', // Store description as content for rendering
          image: metadata.image || ''
        })
      }
    } catch (error) {
      console.error('Failed to fetch URL metadata:', error)
      onUpdate(element.id, {
        title: 'Error fetching metadata',
        author: 'ERROR',
        content: ''
      })
    } finally {
      setFetching(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleFetch()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <Link className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Story</span>
      </div>
      
      {/* URL Input with Fetch Button */}
      <div className="flex gap-2">
        <Input
          placeholder="Paste your link here and press Enter..."
          value={urlInput}
          onChange={(e) => {
            setUrlInput(e.target.value)
            onUpdate(element.id, { url: e.target.value })
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm"
          autoFocus
        />
        <Button
          size="sm"
          onClick={handleFetch}
          disabled={fetching}
        >
          {fetching ? 'Fetching...' : 'Fetch'}
        </Button>
      </div>
      
      {/* Show fields only after we have data */}
      {element.title && (
        <div className="space-y-2">
          <Input
            placeholder="Title"
            value={element.title || ''}
            onChange={(e) => onUpdate(element.id, { title: e.target.value })}
            className="text-sm font-semibold"
          />
          
          <Textarea
            placeholder="Description"
            value={element.content || element.description || ''}
            onChange={(e) => onUpdate(element.id, { 
              content: e.target.value,
              description: e.target.value 
            })}
            className="text-sm min-h-[60px] resize-none"
          />
          
          <Input
            placeholder="Author"
            value={element.author || ''}
            onChange={(e) => onUpdate(element.id, { author: e.target.value })}
            className="text-sm"
          />
          
          {element.image && (
            <div className="mt-2 p-2 bg-muted rounded overflow-hidden">
              <Label className="text-xs text-muted-foreground">Image URL</Label>
              <p className="text-xs truncate" title={element.image}>{element.image}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
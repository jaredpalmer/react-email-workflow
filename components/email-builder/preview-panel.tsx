'use client'

import { useAtom } from 'jotai'
import { Copy, RefreshCw, Code, Eye, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  previewModeAtom, 
  premailHtmlAtom, 
  hasCopiedAtom,
  elementsAtom,
  metaAtom,
  presetsAtom,
  isLoadingAtom,
  templateTypeAtom
} from '@/lib/atoms/editor'
import clipboardCopy from 'clipboard-copy'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export function PreviewPanel() {
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom)
  const [premailHtml, setPremailHtml] = useAtom(premailHtmlAtom)
  const [hasCopied, setHasCopied] = useAtom(hasCopiedAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [elements, setElements] = useAtom(elementsAtom)
  const [meta, setMeta] = useAtom(metaAtom)
  const [presets] = useAtom(presetsAtom)
  const [templateType, setTemplateType] = useAtom(templateTypeAtom)
  const [showNuke, setShowNuke] = useState(false)

  // Create a debounced key that updates less frequently
  const [debouncedKey, setDebouncedKey] = useState<{
    elements: typeof elements
    meta: typeof meta
    presets: typeof presets
    template: typeof templateType
    timestamp: number
  } | null>(null)
  
  useEffect(() => {
    if (elements.length === 0) {
      setDebouncedKey(null)
      return
    }
    
    // Debounce the key update by 500ms to avoid excessive requests while typing
    const timer = setTimeout(() => {
      setDebouncedKey({ elements, meta, presets, template: templateType, timestamp: Date.now() })
    }, 500)
    
    return () => clearTimeout(timer)
  }, [elements, meta, presets, templateType])

  // Fetch premail HTML when debounced key changes
  const { mutate: refreshPremail } = useSWR(
    debouncedKey ? ['/api/premail', debouncedKey] : null,
    async ([url, { elements, meta, presets, template }]) => {
      setIsLoading(true)
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ elements, meta, presets, template })
        })
        if (response.ok) {
          const data = await response.json()
          setPremailHtml(data.html)
          return data.html
        }
      } finally {
        setIsLoading(false)
      }
    },
    { 
      revalidateOnFocus: false,
      dedupingInterval: 100, // Reduced since we're debouncing
      // Removed refreshInterval - no more polling!
    }
  )

  const handleCopy = async () => {
    if (premailHtml) {
      await clipboardCopy(premailHtml)
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 2000)
    }
  }

  const handleRefresh = () => {
    refreshPremail()
  }

  const handleNuke = () => {
    // Clear all state and localStorage (but keep preset)
    setElements([])
    setMeta({ 
      subject: '', 
      preheader: '', 
      date: new Date().toLocaleDateString('en-US'),
      presetId: meta.presetId || 'default'
    })
    setPremailHtml('')
    localStorage.removeItem('elements')
    localStorage.removeItem('meta')
    setShowNuke(false)
    // Optionally reload the page for a complete reset
    // window.location.reload()
  }

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied, setHasCopied])

  useEffect(() => {
    if (showNuke) {
      const timer = setTimeout(() => setShowNuke(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [showNuke])

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="h-[42px] min-h-[42px] bg-background border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Preview</span>
          
          {/* Template Selector */}
          <Select value={templateType} onValueChange={(value) => setTemplateType(value as 'old' | 'new')}>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New Template</SelectItem>
              <SelectItem value="old">Old Template (2017)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          {premailHtml && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="gap-2 w-[85px]"
            >
              <Copy className="h-4 w-4" />
              {hasCopied ? 'Copied!' : 'Copy'}
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPreviewMode(previewMode === 'visual' ? 'html' : 'visual')}
            className="gap-2 w-[130px]"
          >
            {previewMode === 'visual' ? (
              <>
                <Code className="h-4 w-4" />
                Show HTML
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Show Preview
              </>
            )}
          </Button>
          
          {showNuke ? (
            <Button
              size="sm"
              variant="destructive"
              onClick={handleNuke}
              className="gap-2 w-[130px]"
            >
              <Trash2 className="h-4 w-4" />
              Are you sure?
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowNuke(true)}
              className="gap-2 w-[80px]"
            >
              <Trash2 className="h-4 w-4" />
              Nuke
            </Button>
          )}
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : previewMode === 'visual' ? (
          <iframe
            srcDoc={premailHtml || '<html><body style="padding: 20px; font-family: system-ui;">Start adding elements to see preview...</body></html>'}
            className="w-full h-full border-0 bg-white"
            title="Email Preview"
          />
        ) : (
          <div className="h-full overflow-auto">
            <pre className="p-4 text-xs">
              <code>{premailHtml || '<!-- HTML will appear here once you add elements -->'}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
'use client'

import * as React from 'react'
import { useAtom } from 'jotai'
import { Code, Link, FileText, CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { elementsAtom, metaAtom, elementSchemas, expandedElementIdAtom } from '@/lib/atoms/editor'
import type { EmailElement } from '@/lib/atoms/editor'
import { ElementList } from './element-list'
import { ExpandedElementView } from './expanded-element-view'
import { PresetManager } from './preset-manager'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export function EditorPanel() {
  const [meta, setMeta] = useAtom(metaAtom)
  const [elements, setElements] = useAtom(elementsAtom)
  const [expandedElementId] = useAtom(expandedElementIdAtom)
  const [datePopoverOpen, setDatePopoverOpen] = React.useState(false)

  const handleAddElement = (type: keyof typeof elementSchemas) => {
    const newElement: EmailElement = {
      id: `${type}-${Date.now()}`,
      ...elementSchemas[type]
    } as EmailElement
    
    setElements([...elements, newElement])
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setMeta({ ...meta, date: format(date, 'MM/dd/yyyy') })
      setDatePopoverOpen(false)
    }
  }

  const parsedDate = meta.date ? new Date(meta.date) : undefined

  // If an element is expanded, show only that element in full-screen mode
  if (expandedElementId) {
    return <ExpandedElementView />
  }

  // Normal view
  return (
    <div className="h-full flex flex-col relative">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-4">
        {/* Meta Section */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Enter the subject line...(keep it short!)"
              value={meta.subject}
              onChange={(e) => setMeta({ ...meta, subject: e.target.value })}
              className="flex-1"
            />
            <PresetManager />
            <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    !meta.date && "text-muted-foreground"
                  )}
                  title={meta.date || "Pick a date"}
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={parsedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="bg-background"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="relative">
            <Textarea
              placeholder="Preview text"
              value={meta.preheader}
              onChange={(e) => setMeta({ ...meta, preheader: e.target.value })}
              className="resize-none pr-12"
              cols={2}
            />
            <span 
              className={cn(
                "absolute bottom-2 right-2 text-[10px]",
                meta.preheader.length > 150 ? "text-red-500" : "text-muted-foreground"
              )}
            >
              {meta.preheader.length}/150
            </span>
          </div>
        </div>

        {/* Element List */}
        <ElementList />
      </div>

      {/* Fixed Element Buttons at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-background border-t px-8 py-4 z-20">
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-14 flex flex-col gap-0.5"
            onClick={() => handleAddElement('url')}
          >
            <Link className="h-4 w-4" />
            <span className="text-xs">Story</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-14 flex flex-col gap-0.5"
            onClick={() => handleAddElement('markdown')}
          >
            <FileText className="h-4 w-4" />
            <span className="text-xs">Markdown</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-14 flex flex-col gap-0.5"
            onClick={() => handleAddElement('html')}
          >
            <Code className="h-4 w-4" />
            <span className="text-xs">HTML</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
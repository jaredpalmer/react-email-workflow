'use client'

import { memo, useCallback } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { 
  GripVertical, 
  MoreVertical, 
  Trash2, 
  Maximize2, 
  Minimize2,
  ChevronUp,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
  ArrowUpToLine,
  ArrowDownToLine,
  Link,
  FileText,
  Code
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { EmailElement } from '@/lib/atoms/editor'
import { expandedElementIdAtom, elementsAtom, elementSchemas } from '@/lib/atoms/editor'
import { useAtom } from 'jotai'
import { UrlElement } from './elements/url-element'
import { MarkdownElement } from './elements/markdown-element'
import { HtmlElement } from './elements/html-element'

interface DraggableCardProps {
  element: EmailElement
  index: number
  totalElements: number
  onUpdate: (id: string, updates: Partial<EmailElement>) => void
  onDelete: (id: string) => void
  onMove: (id: string, direction: 'top' | 'up' | 'down' | 'bottom') => void
}

function DraggableCardComponent({ 
  element, 
  index,
  totalElements,
  onUpdate, 
  onDelete,
  onMove 
}: DraggableCardProps) {
  const [expandedElementId, setExpandedElementId] = useAtom(expandedElementIdAtom)
  const [elements, setElements] = useAtom(elementsAtom)
  const isExpanded = expandedElementId === element.id
  const canExpand = true
  
  const isFirst = index === 0
  const isLast = index === totalElements - 1
  
  // Memoize callbacks to prevent unnecessary re-renders
  const handleToggleExpand = useCallback(() => {
    setExpandedElementId(isExpanded ? null : element.id)
  }, [isExpanded, element.id, setExpandedElementId])
  
  const handleDelete = useCallback(() => {
    onDelete(element.id)
  }, [element.id, onDelete])

  const handleInsertAbove = useCallback((type: keyof typeof elementSchemas) => {
    const newElement: EmailElement = {
      id: `${type}-${Date.now()}`,
      ...elementSchemas[type]
    } as EmailElement
    
    const newElements = [...elements]
    newElements.splice(index, 0, newElement)
    setElements(newElements)
  }, [index, elements, setElements])

  const handleInsertBelow = useCallback((type: keyof typeof elementSchemas) => {
    const newElement: EmailElement = {
      id: `${type}-${Date.now()}`,
      ...elementSchemas[type]
    } as EmailElement
    
    const newElements = [...elements]
    newElements.splice(index + 1, 0, newElement)
    setElements(newElements)
  }, [index, elements, setElements])
  
  const handleMoveTop = useCallback(() => onMove(element.id, 'top'), [element.id, onMove])
  const handleMoveUp = useCallback(() => onMove(element.id, 'up'), [element.id, onMove])
  const handleMoveDown = useCallback(() => onMove(element.id, 'down'), [element.id, onMove])
  const handleMoveBottom = useCallback(() => onMove(element.id, 'bottom'), [element.id, onMove])
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition?.replace(/\d+ms/g, '150ms'), // Speed up transitions
  }

  const renderElement = () => {
    switch (element.kind) {
      case 'url':
        return <UrlElement element={element} onUpdate={onUpdate} />
      case 'markdown':
        return <MarkdownElement element={element} onUpdate={onUpdate} />
      case 'html':
        return <HtmlElement element={element} onUpdate={onUpdate} />
      default:
        return null
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`relative overflow-hidden ${isDragging ? 'opacity-50 will-change-transform' : ''}`}
    >
      {/* Expand Button - absolutely positioned in top right */}
      {canExpand && (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleToggleExpand}
                className="absolute top-2 right-2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground z-10"
              >
                {isExpanded ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isExpanded ? "Collapse" : "Expand"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <div className="flex">
        {/* Movement and Action Buttons - stacked vertically */}
        <TooltipProvider delayDuration={200}>
          <div className="flex flex-col items-center px-1 py-2 shrink-0 gap-0.5 bg-muted/30">
            {/* Drag Handle at top */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="cursor-move hover:bg-muted/70 rounded p-0.5 transition-colors duration-150"
                  {...attributes}
                  {...listeners}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Drag to reorder</p>
              </TooltipContent>
            </Tooltip>

            <div className="h-px w-4 bg-border my-1" />

            {/* Move to top */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleMoveTop}
                  disabled={isFirst}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronsUp className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Move to top</p>
              </TooltipContent>
            </Tooltip>

            {/* Move up */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleMoveUp}
                  disabled={isFirst}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Move up</p>
              </TooltipContent>
            </Tooltip>

            {/* Move down */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleMoveDown}
                  disabled={isLast}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Move down</p>
              </TooltipContent>
            </Tooltip>

            {/* Move to bottom */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleMoveBottom}
                  disabled={isLast}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronsDown className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Move to bottom</p>
              </TooltipContent>
            </Tooltip>

            <div className="h-px w-4 bg-border my-1" />

            {/* More Options Dropdown */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>More options</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start" side="right" className="w-48">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <ArrowUpToLine className="h-4 w-4 mr-2" />
                    Insert Above
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleInsertAbove('html')}>
                      <Code className="h-4 w-4 mr-2 text-purple-600" />
                      HTML
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleInsertAbove('url')}>
                      <Link className="h-4 w-4 mr-2 text-blue-600" />
                      Story
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleInsertAbove('markdown')}>
                      <FileText className="h-4 w-4 mr-2 text-green-600" />
                      Markdown
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <ArrowDownToLine className="h-4 w-4 mr-2" />
                    Insert Below
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleInsertBelow('html')}>
                      <Code className="h-4 w-4 mr-2 text-purple-600" />
                      HTML
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleInsertBelow('url')}>
                      <Link className="h-4 w-4 mr-2 text-blue-600" />
                      Story
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleInsertBelow('markdown')}>
                      <FileText className="h-4 w-4 mr-2 text-green-600" />
                      Markdown
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipProvider>

        {/* Element Content */}
        <div className="flex-1 py-2 px-3 min-w-0">
          {renderElement()}
        </div>
      </div>
    </Card>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const DraggableCard = memo(DraggableCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.element.id === nextProps.element.id &&
    prevProps.element.kind === nextProps.element.kind &&
    prevProps.element.content === nextProps.element.content &&
    prevProps.element.title === nextProps.element.title &&
    prevProps.element.url === nextProps.element.url &&
    prevProps.element.author === nextProps.element.author &&
    prevProps.element.description === nextProps.element.description &&
    prevProps.element.image === nextProps.element.image &&
    prevProps.index === nextProps.index &&
    prevProps.totalElements === nextProps.totalElements
  )
})
'use client'

import { useAtom } from 'jotai'
import { expandedElementIdAtom, elementsAtom } from '@/lib/atoms/editor'
import type { EmailElement } from '@/lib/atoms/editor'
import { Button } from '@/components/ui/button'
import { X, Code, Link, FileText, WrapText } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@codemirror/view'
import { UrlElement } from './elements/url-element'
import { MarkdownToolbar } from './markdown-toolbar'
import { useState, useRef, useEffect, useCallback } from 'react'

// Custom hook for managing editor height
function useEditorHeight(containerRef: React.RefObject<HTMLDivElement>) {
  const [height, setHeight] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const calculatedHeight = window.innerHeight - 42 - 32 - 40
      return `${Math.max(400, calculatedHeight)}px`
    }
    return '600px'
  })

  const calculateHeight = useCallback(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const availableHeight = containerRect.height - 2
      setHeight(`${Math.max(400, availableHeight)}px`)
    } else {
      const windowHeight = window.innerHeight - 42 - 32 - 40
      setHeight(`${Math.max(400, windowHeight)}px`)
    }
  }, [containerRef])

  useEffect(() => {
    calculateHeight()
    
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(calculateHeight, 100)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [calculateHeight])

  return height
}

export function ExpandedElementView() {
  const [expandedElementId, setExpandedElementId] = useAtom(expandedElementIdAtom)
  const [elements, setElements] = useAtom(elementsAtom)
  const [wrapText, setWrapText] = useState(true)
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const editorHeight = useEditorHeight(containerRef)
  
  const element = elements.find(el => el.id === expandedElementId)
  
  if (!element) return null
  
  const handleUpdate = (id: string, updates: Partial<EmailElement>) => {
    setElements((items) =>
      items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    )
  }
  
  const handleInsertMarkdown = (before: string, after: string, placeholder?: string) => {
    if (!editorRef.current) return
    
    const view = editorRef.current.view
    if (!view) return
    
    const { from, to } = view.state.selection.main
    const selectedText = view.state.doc.sliceString(from, to)
    const insertText = selectedText || placeholder || ''
    const newText = `${before}${insertText}${after}`
    
    view.dispatch({
      changes: { from, to, insert: newText },
      selection: { 
        anchor: from + before.length,
        head: from + before.length + insertText.length
      }
    })
    
    view.focus()
  }
  
  const renderExpandedElement = () => {
    switch (element.kind) {
      case 'url':
        return <UrlElement element={element} onUpdate={handleUpdate} />
      case 'markdown':
        const extensions = [
          markdown(),
          EditorView.theme({
            "&": {
              fontSize: "14px",
            },
            ".cm-scroller": {
              fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
              padding: "16px 0",
            },
            ".cm-content": {
              padding: "0 16px",
            },
            ".cm-line": {
              padding: "0",
            },
            "&.cm-focused": {
              outline: "none",
            },
            ".cm-gutters": {
              backgroundColor: "transparent",
              border: "none",
            }
          })
        ]
        if (wrapText) {
          extensions.push(EditorView.lineWrapping)
        }
        return (
          <div className="h-full border rounded-md overflow-hidden">
            <MarkdownToolbar onInsert={handleInsertMarkdown} />
            <CodeMirror
              ref={editorRef}
              value={element.content || ''}
              height={`calc(${editorHeight} - 36px)`}
              theme={undefined}
              extensions={extensions}
              onChange={(value) => handleUpdate(element.id, { content: value })}
              placeholder="Write markdown content..."
              basicSetup={{
                lineNumbers: true,
                foldGutter: false,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: false,
                highlightSelectionMatches: true,
                searchKeymap: true,
              }}
            />
          </div>
        )
      case 'html':
        return (
          <div className="h-full border rounded-md overflow-hidden">
            <CodeMirror
              value={element.content || ''}
              height={editorHeight}
              theme={undefined}
              extensions={[
                html(),
                EditorView.theme({
                  "&": {
                    fontSize: "14px",
                  },
                  ".cm-scroller": {
                    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
                    padding: "16px 0",
                  },
                  ".cm-content": {
                    padding: "0 16px",
                  },
                  ".cm-line": {
                    padding: "0",
                  },
                  "&.cm-focused": {
                    outline: "none",
                  },
                  ".cm-gutters": {
                    backgroundColor: "transparent",
                    border: "none",
                  }
                }),
                EditorView.lineWrapping
              ]}
              onChange={(value) => handleUpdate(element.id, { content: value })}
              placeholder="Enter HTML content..."
              basicSetup={{
                lineNumbers: true,
                foldGutter: false,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: false,
                highlightSelectionMatches: false,
                searchKeymap: false,
              }}
            />
          </div>
        )
      default:
        return null
    }
  }
  
  const getElementIcon = () => {
    switch (element.kind) {
      case 'url':
        return <Link className="h-4 w-4" />
      case 'markdown':
        return <FileText className="h-4 w-4" />
      case 'html':
        return <Code className="h-4 w-4" />
      default:
        return null
    }
  }

  const getElementLabel = () => {
    switch (element.kind) {
      case 'url':
        return 'Story'
      case 'markdown':
        return 'Markdown'
      case 'html':
        return 'HTML'
      default:
        return element.kind
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header - matching preview panel */}
      <div className="h-[42px] min-h-[42px] bg-background border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {getElementIcon()}
          <span className="text-sm font-medium">{getElementLabel()}</span>
        </div>
        <div className="flex items-center gap-2">
          {element.kind === 'markdown' && (
            <Button
              size="sm"
              variant={wrapText ? "default" : "ghost"}
              onClick={() => setWrapText(!wrapText)}
              className="h-8 px-2"
              title={wrapText ? "Disable text wrapping" : "Enable text wrapping"}
            >
              <WrapText className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpandedElementId(null)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Expanded Content Area */}
      <div ref={containerRef} className="flex-1 overflow-hidden p-4">
        {element.kind === 'markdown' || element.kind === 'html' ? (
          <div className="h-full">
            {renderExpandedElement()}
          </div>
        ) : (
          renderExpandedElement()
        )}
      </div>
    </div>
  )
}
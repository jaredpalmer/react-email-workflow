'use client'

import { useEffect, useRef } from 'react'
import { FileText } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@codemirror/view'
import type { EmailElement } from '@/lib/atoms/editor'
import { useAtom } from 'jotai'
import { newlyAddedElementIdAtom } from '@/lib/atoms/editor'
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror'

interface MarkdownElementProps {
  element: EmailElement
  onUpdate: (id: string, updates: Partial<EmailElement>) => void
}

export function MarkdownElement({ element, onUpdate }: MarkdownElementProps) {
  const [newlyAddedElementId, setNewlyAddedElementId] = useAtom(newlyAddedElementIdAtom)
  const editorRef = useRef<ReactCodeMirrorRef>(null)
  
  // Auto-focus when this element is newly added
  useEffect(() => {
    if (newlyAddedElementId === element.id) {
      // Use setTimeout to ensure CodeMirror is fully rendered and scrolled into view
      const timeoutId = setTimeout(() => {
        if (editorRef.current?.view) {
          editorRef.current.view.focus()
          // Place cursor at the beginning
          editorRef.current.view.dispatch({
            selection: { anchor: 0, head: 0 }
          })
        }
        // Clear the newly added element ID after focusing
        setNewlyAddedElementId(null)
      }, 300)
      
      return () => clearTimeout(timeoutId)
    }
  }, [newlyAddedElementId, element.id, setNewlyAddedElementId])

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="h-4 w-4 text-green-600" />
        <span className="text-sm font-medium">Markdown</span>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <CodeMirror
          ref={editorRef}
          value={element.content || ''}
          height="200px"
          theme={undefined}
          extensions={[markdown(), EditorView.lineWrapping]}
          onChange={(value) => onUpdate(element.id, { content: value })}
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
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>Supports: **bold**, *italic*, [links](url), lists, quotes, and more</p>
      </div>
    </div>
  )
}
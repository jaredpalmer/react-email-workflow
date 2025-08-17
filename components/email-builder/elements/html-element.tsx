'use client'

import { Code } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import type { EmailElement } from '@/lib/atoms/editor'

interface HtmlElementProps {
  element: EmailElement
  onUpdate: (id: string, updates: Partial<EmailElement>) => void
}

export function HtmlElement({ element, onUpdate }: HtmlElementProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <Code className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">HTML</span>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <CodeMirror
          value={element.content || ''}
          height="200px"
          theme={undefined} // Use light theme
          extensions={[html()]}
          onChange={(value) => onUpdate(element.id, { content: value })}
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
    </div>
  )
}
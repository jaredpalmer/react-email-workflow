'use client'

import { FileText } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import type { EmailElement } from '@/lib/atoms/editor'

interface MarkdownElementProps {
  element: EmailElement
  onUpdate: (id: string, updates: Partial<EmailElement>) => void
}

export function MarkdownElement({ element, onUpdate }: MarkdownElementProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Markdown</span>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <CodeMirror
          value={element.content || ''}
          height="200px"
          theme={undefined}
          extensions={[markdown()]}
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
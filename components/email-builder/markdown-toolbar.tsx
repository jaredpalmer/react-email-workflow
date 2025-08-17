'use client'

import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  Link, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Heading1, 
  Heading2, 
  Heading3,
  Minus,
  Image
} from 'lucide-react'

interface MarkdownToolbarProps {
  onInsert: (before: string, after: string, placeholder?: string) => void
}

export function MarkdownToolbar({ onInsert }: MarkdownToolbarProps) {
  const tools = [
    {
      icon: Bold,
      title: 'Bold (Cmd+B)',
      action: () => onInsert('**', '**', 'bold text'),
    },
    {
      icon: Italic,
      title: 'Italic (Cmd+I)',
      action: () => onInsert('*', '*', 'italic text'),
    },
    {
      icon: Link,
      title: 'Link (Cmd+K)',
      action: () => onInsert('[', '](url)', 'link text'),
    },
    {
      icon: Image,
      title: 'Image',
      action: () => onInsert('![', '](url)', 'alt text'),
    },
    { divider: true },
    {
      icon: Heading1,
      title: 'Heading 1',
      action: () => onInsert('# ', '', 'Heading 1'),
    },
    {
      icon: Heading2,
      title: 'Heading 2',
      action: () => onInsert('## ', '', 'Heading 2'),
    },
    {
      icon: Heading3,
      title: 'Heading 3',
      action: () => onInsert('### ', '', 'Heading 3'),
    },
    { divider: true },
    {
      icon: List,
      title: 'Bullet List',
      action: () => onInsert('- ', '', 'List item'),
    },
    {
      icon: ListOrdered,
      title: 'Numbered List',
      action: () => onInsert('1. ', '', 'List item'),
    },
    {
      icon: Quote,
      title: 'Quote',
      action: () => onInsert('> ', '', 'Quote'),
    },
    {
      icon: Code,
      title: 'Code',
      action: () => onInsert('`', '`', 'code'),
    },
    {
      icon: Minus,
      title: 'Horizontal Rule',
      action: () => onInsert('\n---\n', '', ''),
    },
  ]

  return (
    <div className="flex items-center gap-0.5 p-1 border-b bg-muted/30">
      {tools.map((tool, index) => {
        if ('divider' in tool) {
          return <div key={index} className="w-px h-6 bg-border mx-1" />
        }
        
        const Icon = tool.icon
        return (
          <Button
            key={index}
            size="sm"
            variant="ghost"
            onClick={tool.action}
            className="h-7 w-7 p-0"
            title={tool.title}
          >
            <Icon className="h-3.5 w-3.5" />
          </Button>
        )
      })}
    </div>
  )
}
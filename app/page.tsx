'use client'

import { EditorPanel } from '@/components/email-builder/editor-panel'
import { PreviewPanel } from '@/components/email-builder/preview-panel'

export default function EmailBuilderPage() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Editor Panel - Left Side */}
      <div className="w-[616px] shrink-0 border-r bg-background overflow-y-auto">
        <EditorPanel />
      </div>
      
      {/* Preview Panel - Right Side */}
      <div className="flex-1 bg-muted/30 overflow-y-auto">
        <PreviewPanel />
      </div>
    </div>
  )
}
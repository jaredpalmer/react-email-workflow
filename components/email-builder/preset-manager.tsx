'use client'

import * as React from 'react'
import { useAtom } from 'jotai'
import { Settings2, Plus, Edit2, Trash2, Check } from 'lucide-react'
import { 
  presetsAtom, 
  metaAtom,
  type EmailPreset 
} from '@/lib/atoms/editor'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PresetManager() {
  const [presets, setPresets] = useAtom(presetsAtom)
  const [meta, setMeta] = useAtom(metaAtom)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editingPreset, setEditingPreset] = React.useState<EmailPreset | null>(null)
  const [formData, setFormData] = React.useState({
    name: '',
    title: '',
    url: '',
    subtitle: ''
  })

  const activePresetId = meta.presetId || 'default'

  const handleSwitchPreset = (presetId: string) => {
    setMeta(prev => ({ ...prev, presetId }))
  }

  const handleCreateOrEdit = () => {
    if (editingPreset) {
      // Edit existing preset
      setPresets(prev => prev.map(p => 
        p.id === editingPreset.id 
          ? { ...p, ...formData }
          : p
      ))
    } else {
      // Create new preset
      const newPreset: EmailPreset = {
        id: `preset-${Date.now()}`,
        ...formData
      }
      setPresets(prev => [...prev, newPreset])
      // Switch to the new preset
      handleSwitchPreset(newPreset.id)
    }
    setDialogOpen(false)
    setEditingPreset(null)
    setFormData({ name: '', title: '', url: '', subtitle: '' })
  }

  const handleDelete = (preset: EmailPreset) => {
    // Don't allow deleting if it's the only preset
    if (presets.length <= 1) return
    
    // If deleting the active preset, switch to another one
    if (preset.id === activePresetId) {
      const otherPreset = presets.find(p => p.id !== preset.id)
      if (otherPreset) {
        handleSwitchPreset(otherPreset.id)
      }
    }
    
    setPresets(prev => prev.filter(p => p.id !== preset.id))
  }

  const openEditDialog = (preset: EmailPreset) => {
    setEditingPreset(preset)
    setFormData({
      name: preset.name,
      title: preset.title,
      url: preset.url,
      subtitle: preset.subtitle
    })
    setDialogOpen(true)
  }

  const openCreateDialog = () => {
    setEditingPreset(null)
    setFormData({ name: '', title: '', url: '', subtitle: '' })
    setDialogOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            title="Manage presets"
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {presets.map(preset => (
            <DropdownMenuItem
              key={preset.id}
              className="flex items-center justify-between group"
            >
              <button
                className="flex items-center gap-2 flex-1 text-left"
                onClick={() => handleSwitchPreset(preset.id)}
              >
                {preset.id === activePresetId && (
                  <Check className="h-3 w-3" />
                )}
                <span className={preset.id === activePresetId ? 'font-medium' : ''}>
                  {preset.name}
                </span>
              </button>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openEditDialog(preset)
                  }}
                  className="p-1 hover:bg-accent rounded"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
                {presets.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(preset)
                    }}
                    className="p-1 hover:bg-accent rounded"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openCreateDialog}>
            <Plus className="h-3 w-3 mr-2" />
            New Preset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPreset ? 'Edit Preset' : 'Create New Preset'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Preset Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., My Newsletter"
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., ShellyPalmer"
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="e.g., https://example.com"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="e.g., Think about this"
              />
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between">
            <div className="flex-1">
              {editingPreset && presets.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleDelete(editingPreset)
                    setDialogOpen(false)
                    setEditingPreset(null)
                    setFormData({ name: '', title: '', url: '', subtitle: '' })
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Preset
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateOrEdit}>
                {editingPreset ? 'Save Changes' : 'Create Preset'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
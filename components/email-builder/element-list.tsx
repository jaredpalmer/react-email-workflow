'use client'

import { useCallback, useMemo } from 'react'
import { useAtom } from 'jotai'
import { elementsAtom } from '@/lib/atoms/editor'
import type { EmailElement } from '@/lib/atoms/editor'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { DraggableCard } from './draggable-card'

export function ElementList() {
  const [elements, setElements] = useAtom(elementsAtom)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }, [setElements])

  const handleElementUpdate = useCallback((id: string, updates: Partial<EmailElement>) => {
    setElements((items) =>
      items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    )
  }, [setElements])

  const handleElementDelete = useCallback((id: string) => {
    setElements((items) => items.filter((item) => item.id !== id))
  }, [setElements])

  const handleElementMove = useCallback((id: string, direction: 'top' | 'up' | 'down' | 'bottom') => {
    setElements((items) => {
      const currentIndex = items.findIndex((item) => item.id === id)
      if (currentIndex === -1) return items
      
      let newIndex: number
      switch (direction) {
        case 'top':
          newIndex = 0
          break
        case 'up':
          newIndex = Math.max(0, currentIndex - 1)
          break
        case 'down':
          newIndex = Math.min(items.length - 1, currentIndex + 1)
          break
        case 'bottom':
          newIndex = items.length - 1
          break
      }
      
      if (newIndex === currentIndex) return items
      return arrayMove(items, currentIndex, newIndex)
    })
  }, [setElements])
  
  // Memoize the element IDs for SortableContext
  const elementIds = useMemo(() => elements.map((el) => el.id), [elements])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={elementIds}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {elements.map((element, index) => (
            <DraggableCard
              key={element.id}
              element={element}
              index={index}
              totalElements={elements.length}
              onUpdate={handleElementUpdate}
              onDelete={handleElementDelete}
              onMove={handleElementMove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
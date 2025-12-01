"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import type { Chore } from "@/store/household-store"
import { EditChoreModal } from "./edit-chore-modal"
import { DeleteChoreModal } from "./delete-chore-modal"

interface EditChoreFormProps {
  chore: Chore
}

export function EditChoreForm({ chore }: EditChoreFormProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return (
    <>
      <div className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0">{chore.icon}</span>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-foreground">{chore.name}</p>
              <p className="text-xs text-muted-foreground truncate">{chore.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Edit chore"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Delete chore"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <EditChoreModal chore={chore} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <DeleteChoreModal
        choreId={chore.id}
        choreName={chore.name}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
    </>
  )
}

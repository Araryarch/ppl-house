"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import type { Chore, Member } from "@/store/household-store"
import { EditChoreModal } from "./edit-chore-modal"
import { DeleteChoreModal } from "./delete-chore-modal"

interface ChoreCardProps {
  chore: Chore
  member?: Member
  onComplete: () => void
}

export function ChoreCard({ chore, member, onComplete }: ChoreCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return (
    <>
      <div className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl">{chore.icon}</span>
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Edit chore"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Delete chore"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-foreground">{chore.name}</h3>

        <div className="flex gap-2 mb-3">
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full font-medium">
            {chore.frequency}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-xs">
          <span className="text-muted-foreground">Assigned to</span>
          {member && (
            <div className="flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold text-card"
                style={{ backgroundColor: member.color }}
              >
                {member.avatar}
              </div>
              <span className="font-medium text-foreground">{member.name}</span>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground mb-3">⏰ {chore.dueDate}</div>

        <button
          onClick={onComplete}
          className="w-full bg-accent text-foreground hover:bg-accent/80 font-medium py-2 rounded-lg transition-colors text-xs md:text-sm"
        >
          Mark Complete
        </button>
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

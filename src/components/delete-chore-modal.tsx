"use client"

import { Trash2, X } from "lucide-react"
import { useHouseholdStore } from "@/store/household-store"

interface DeleteChoreModalProps {
  choreId: string
  choreName: string
  isOpen: boolean
  onClose: () => void
}

export function DeleteChoreModal({ choreId, choreName, isOpen, onClose }: DeleteChoreModalProps) {
  const deleteChore = useHouseholdStore((state) => state.deleteChore)
  const addNotification = useHouseholdStore((state) => state.addNotification)

  const handleDelete = () => {
    deleteChore(choreId)
    addNotification({
      type: "success",
      title: "Chore Deleted",
      message: `${choreName} has been deleted`,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Delete Chore</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Are you sure you want to delete <span className="font-semibold text-foreground">{choreName}</span>? This
          action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import type { Chore } from '@/store/household-store'
import { useHouseholdStore } from '@/store/household-store'

interface EditChoreModalProps {
  chore: Chore
  isOpen: boolean
  onClose: () => void
}

export function EditChoreModal({
  chore,
  isOpen,
  onClose,
}: EditChoreModalProps) {
  const [name, setName] = useState(chore.name)
  const [description, setDescription] = useState(chore.description)
  const [frequency, setFrequency] = useState(chore.frequency)
  const [icon, setIcon] = useState(chore.icon)

  const updateChore = useHouseholdStore((state) => state.updateChore)
  const addNotification = useHouseholdStore((state) => state.addNotification)

  const handleSave = () => {
    if (!name.trim()) return

    updateChore({
      ...chore,
      name,
      description,
      frequency: frequency as 'Daily' | 'Weekly' | 'Bi-weekly',
      icon,
    })

    addNotification({
      type: 'success',
      title: 'Chore Updated',
      message: `${name} has been updated successfully`,
    })

    onClose()
  }

  if (!isOpen) return null

  const icons = ['🍽️', '🗑️', '🧹', '🧽', '🛏️', '🚿', '💧', '🧻', '🧼', '🧺']

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-foreground">Edit Chore</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Chore Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              placeholder="Chore name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              placeholder="Chore description"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value as 'Daily' | 'Weekly' | 'Bi-weekly')
              }
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {icons.map((ic) => (
                <button
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`p-2 rounded-lg text-2xl transition-colors ${
                    icon === ic
                      ? 'bg-primary/20 border border-primary'
                      : 'border border-border hover:bg-muted'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

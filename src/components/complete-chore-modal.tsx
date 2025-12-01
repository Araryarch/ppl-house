'use client'

import type React from 'react'

import { useState } from 'react'
import { useHouseholdStore } from '@/store/household-store'
import { X, Upload } from 'lucide-react'
import Image from 'next/image'

interface CompleteChoreModalProps {
  choreId: string
  onClose: () => void
}

export function CompleteChoreModal({
  choreId,
  onClose,
}: CompleteChoreModalProps) {
  const [notes, setNotes] = useState('')
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const chores = useHouseholdStore((state) => state.chores)
  const completeChore = useHouseholdStore((state) => state.completeChore)
  const addNotification = useHouseholdStore((state) => state.addNotification)

  const chore = chores.find((c) => c.id === choreId)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleComplete = () => {
    completeChore(choreId)
    addNotification({
      type: 'success',
      title: 'Chore Completed',
      message: `${chore?.name} marked as complete!`,
    })
    onClose()
  }

  if (!chore) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card dark:bg-slate-800 rounded-xl border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card dark:bg-slate-800 border-b border-border p-6 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{chore.icon}</span>
            <div>
              <p className="text-xs text-muted-foreground">Complete Chore</p>
              <h2 className="text-lg font-bold text-foreground">
                {chore.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-2">
              Description
            </h3>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {chore.description}
            </p>
          </div>

          {/* Photo Upload */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-2">
              Photo Evidence (Optional)
            </h3>
            {photoPreview ? (
              <div className="relative">
                <Image
                  src={photoPreview || '/placeholder.svg'}
                  alt="Preview"
                  width={700}
                  height={280}
                  className="w-full h-40 object-cover rounded-lg border border-border"
                />
                <button
                  onClick={() => setPhotoPreview(null)}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-1 rounded-lg transition-colors"
                  aria-label="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-accent transition-colors bg-muted/50">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm font-medium text-foreground">
                  Upload photo
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or WebP (max 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  aria-label="Upload chore completion photo"
                />
              </label>
            )}
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-2">
              Additional Notes (Optional)
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional details about completing this chore..."
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 px-4 py-2 bg-accent text-foreground rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm"
            >
              Mark Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

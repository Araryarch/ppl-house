"use client"

import type React from "react"

import { useState } from "react"
import { useHouseholdStore } from "@/store/household-store"

interface AddChoreModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddChoreModal({ isOpen, onClose }: AddChoreModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [frequency, setFrequency] = useState<"Daily" | "Weekly" | "Bi-weekly">("Weekly")
  const [assignedTo, setAssignedTo] = useState("")
  const [icon, setIcon] = useState("🧹")

  const members = useHouseholdStore((state) => state.members)
  const addChore = useHouseholdStore((state) => state.addChore)
  const addNotification = useHouseholdStore((state) => state.addNotification)

  const icons = ["🍽️", "🗑️", "🧹", "🧽", "🚿", "🛏️", "💧", "🪴", "🧼", "🪟"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !assignedTo) {
      addNotification({
        type: "warning",
        title: "Missing Fields",
        message: "Please fill in all required fields",
      })
      return
    }

    const newChore = {
      id: Date.now().toString(),
      name,
      description,
      frequency,
      assignedTo,
      icon,
      dueDate: "Unscheduled",
      completed: false,
      rotationOrder: 0,
    }

    addChore(newChore)
    addNotification({
      type: "success",
      title: "Chore Added",
      message: `"${name}" has been added to the chore list`,
    })

    setName("")
    setDescription("")
    setFrequency("Weekly")
    setAssignedTo("")
    setIcon("🧹")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex justify-between items-center">
          <h2 className="font-semibold text-base md:text-lg">Add New Chore</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-xl transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Icon Selection */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-2">Choose Icon</label>
            <div className="grid grid-cols-5 gap-2">
              {icons.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`p-3 rounded-lg text-xl transition-colors ${
                    icon === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Chore Name */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-2">
              Chore Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Water Plants"
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-2">
              Frequency <span className="text-destructive">*</span>
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as "Daily" | "Weekly" | "Bi-weekly")}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
            </select>
          </div>

          {/* Assign To */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-2">
              Assign To <span className="text-destructive">*</span>
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg font-medium text-sm hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Add Chore
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

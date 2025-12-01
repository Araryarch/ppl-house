'use client'

import React, { useState } from 'react'
import { useChores } from '@/hooks/use-chores'
import { useMembers } from '@/hooks/use-members'

export function AddChoreForm() {
  const [choreName, setChoreName] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly' | 'Bi-weekly'>(
    'Weekly',
  )
  const [icon, setIcon] = useState('✓')
  const [rotationOrder, setRotationOrder] = useState(1)

  const { createChore } = useChores()
  const { members } = useMembers()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (choreName.trim()) {
      createChore({
        name: choreName,
        description,
        frequency,
        icon,
        assignedTo: members[0]?.id || '1',
        dueDate: 'Not scheduled',
        rotationOrder,
      })
      setChoreName('')
      setDescription('')
      setFrequency('Weekly')
      setIcon('✓')
      setRotationOrder(1)
    }
  }

  return (
    <div className="border border-border rounded-xl p-6 bg-card dark:bg-slate-800">
      <h3 className="text-xl font-bold mb-6 text-foreground">
        Quick Add Chore
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground">
            Chore Name *
          </label>
          <input
            type="text"
            value={choreName}
            onChange={(e) => setChoreName(e.target.value)}
            placeholder="e.g., Water Plants"
            className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">
              Frequency *
            </label>
            <select
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value as 'Daily' | 'Weekly' | 'Bi-weekly')
              }
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">
              Rotation Order
            </label>
            <input
              id="rotationOrder"
              type="number"
              value={rotationOrder}
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value || '', 10)
                setRotationOrder(Number.isNaN(parsed) ? 1 : Math.max(1, parsed))
              }}
              min={1}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Create Chore
        </button>
      </form>
    </div>
  )
}

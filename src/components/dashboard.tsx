'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { useChores } from '@/hooks/use-chores'
import { TaskCard } from './task-card'
import { RecentActivity } from './recent-activity'
import { UpcomingTasks } from './upcoming-tasks'
import { TaskDistribution } from './task-distribution'
import { AddChoreModal } from './add-chore-modal'
import { CompleteChoreModal } from './complete-chore-modal'

interface DashboardProps {
  onPageChange?: (page: string) => void
}

export function Dashboard({ onPageChange }: DashboardProps) {
  const [isAddChoreOpen, setIsAddChoreOpen] = useState(false)
  const [selectedChoreId, setSelectedChoreId] = useState<string | null>(null)
  const user = useAuthStore((state) => state.user)
  const { getMyChores, getPendingChores } = useChores()

  const myChores = getMyChores(user?.id || '').filter(
    (chore) => !chore.completed,
  )
  const pendingChores = getPendingChores().filter((chore) => !chore.completed)

  const handleCompleteChore = (choreId: string) => {
    setSelectedChoreId(choreId)
  }

  const handleCompleteChoreModalClose = () => {
    setSelectedChoreId(null)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, {user?.name}! 👋
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          You have{' '}
          <span className="font-semibold text-foreground">
            {pendingChores.length} tasks
          </span>{' '}
          to complete
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">My Tasks</h3>
          <button
            onClick={() => onPageChange?.('chores')}
            className="text-accent text-xs font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {myChores.slice(0, 4).map((chore) => (
            <TaskCard
              key={chore.id}
              chore={chore}
              onComplete={() => handleCompleteChore(chore.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Household Overview
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <RecentActivity />
          <UpcomingTasks />
        </div>
      </div>

      <TaskDistribution />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => setIsAddChoreOpen(true)}
          className="bg-accent text-foreground px-4 py-3 rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm w-full"
        >
          + Add Chore
        </button>
        <button
          onClick={() => onPageChange?.('members')}
          className="border border-border text-foreground px-4 py-3 rounded-lg font-medium hover:bg-muted transition-colors text-sm w-full"
        >
          View All Members
        </button>
      </div>

      <AddChoreModal
        isOpen={isAddChoreOpen}
        onClose={() => setIsAddChoreOpen(false)}
      />
      {selectedChoreId && (
        <CompleteChoreModal
          choreId={selectedChoreId}
          onClose={handleCompleteChoreModalClose}
        />
      )}
    </div>
  )
}

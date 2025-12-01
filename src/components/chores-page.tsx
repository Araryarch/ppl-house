'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMembers } from '@/hooks/use-members'
import { useHouseholdStore } from '@/store/household-store'
import type { Chore } from '@/store/household-store'
import { usePagination } from '@/hooks/use-pagination'
import { ChoreCard } from './chore-card'
import { CompleteChoreModal } from './complete-chore-modal'
import { AddChoreModal } from './add-chore-modal'
import { AnimatedCard } from './animated-card'
import { Pagination } from './pagination'

interface ChoresPageProps {
  initialPage?: number
}

export function ChoresPage({ initialPage = 1 }: ChoresPageProps) {
  const [selectedChore, setSelectedChore] = useState<string | null>(null)
  const [isAddChoreOpen, setIsAddChoreOpen] = useState(false)
  const [rotationStrategy, setRotationStrategy] = useState('sequential')

  const chores = useHouseholdStore((state) => state.chores)
  const rotateChores = useHouseholdStore((state) => state.rotateChores)

  const { getMemberById } = useMembers()

  const { paginatedItems, currentPage, totalPages, goToPage } =
    usePagination<Chore>({
      items: chores,
      itemsPerPage: 9,
      initialPage,
    })

  const nextRotationDate = 'Monday, December 2, 2025'

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            All Chores
          </h2>
          <p className="text-xs text-muted-foreground">
            {chores.length} active chores
          </p>
        </div>
        <button
          onClick={() => setIsAddChoreOpen(true)}
          className="bg-accent text-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm w-full md:w-auto"
        >
          + Add Chore
        </button>
      </div>

      <div className="bg-secondary text-foreground p-4 md:p-5 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border border-border">
        <div className="flex items-center gap-3">
          <span className="text-lg md:text-xl">🔄</span>
          <div>
            <p className="font-semibold text-sm">Next Rotation</p>
            <p className="text-xs opacity-75">{nextRotationDate}</p>
          </div>
        </div>
        <button
          onClick={rotateChores}
          className="bg-accent text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-accent/80 transition-colors text-xs md:text-sm whitespace-nowrap w-full sm:w-auto"
        >
          Rotate Now
        </button>
      </div>

      <select
        value={rotationStrategy}
        onChange={(e) => setRotationStrategy(e.target.value)}
        className="px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm w-full"
      >
        <option value="sequential">Sequential Rotation</option>
        <option value="loadBalanced">Load Balanced</option>
        <option value="smart">Smart (Least Completed)</option>
      </select>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        {paginatedItems.map((chore, index) => (
          <AnimatedCard key={chore.id} index={index}>
            <ChoreCard
              chore={chore}
              member={getMemberById(chore.assignedTo)}
              onComplete={() => setSelectedChore(chore.id)}
            />
          </AnimatedCard>
        ))}
      </motion.div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />

      {selectedChore && (
        <CompleteChoreModal
          choreId={selectedChore}
          onClose={() => setSelectedChore(null)}
        />
      )}
      <AddChoreModal
        isOpen={isAddChoreOpen}
        onClose={() => setIsAddChoreOpen(false)}
      />
    </div>
  )
}

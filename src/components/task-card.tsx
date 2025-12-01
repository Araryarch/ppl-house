'use client'

import { motion } from 'framer-motion'
import type { Chore } from '@/store/household-store'

interface TaskCardProps {
  chore: Chore
  onComplete?: (choreId: string) => void
}

export function TaskCard({ chore, onComplete }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-xl p-4 md:p-5 bg-card border border-border/50 flex flex-col justify-between min-h-[140px] md:min-h-40 cursor-pointer hover:border-border hover:shadow-lg transition-all group">
        <div className="flex items-start justify-between gap-2">
          <span className="text-2xl md:text-3xl">{chore.icon}</span>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-sm md:text-base line-clamp-2 text-foreground">
            {chore.name}
          </p>
          <p className="text-xs text-muted-foreground">{chore.dueDate}</p>
        </div>

        <button
          onClick={() => onComplete?.(chore.id)}
          className="bg-muted text-foreground rounded-lg px-3 md:px-4 py-2 md:py-2.5 font-semibold hover:bg-accent transition-colors text-xs md:text-sm w-full mt-2"
        >
          Complete
        </button>
      </div>
    </motion.div>
  )
}

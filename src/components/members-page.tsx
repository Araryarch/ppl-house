'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { useMembers } from '@/hooks/use-members'
import { usePagination } from '@/hooks/use-pagination'
import { InviteMemberModal } from './invite-member-modal'
import { AnimatedCard } from './animated-card'
import { Pagination } from './pagination'

interface MembersPageProps {
  initialPage?: number
}

export function MembersPage({ initialPage = 1 }: MembersPageProps) {
  const { members, getTopContributor, getMembersByContribution } = useMembers()
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const topContributor = getTopContributor()

  const { paginatedItems, currentPage, totalPages, goToPage } = usePagination({
    items: getMembersByContribution(),
    itemsPerPage: 4,
    initialPage,
  })

  const handleCopyInvite = () => {
    navigator.clipboard.writeText('https://chorewheel.app/invite/apartment4b')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Household Members
          </h2>
          <p className="text-xs text-muted-foreground">
            {members.length} members in Apartment 4B
          </p>
        </div>
        <button
          onClick={() => setIsInviteOpen(true)}
          className="bg-accent text-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm w-full md:w-auto"
        >
          + Invite Member
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-secondary text-foreground p-4 rounded-lg border border-border"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">👑</span>
          <h3 className="font-semibold text-sm md:text-base">
            Top Contributor This Month
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0 font-semibold text-foreground bg-muted">
            {topContributor.avatar}
          </div>
          <div>
            <p className="font-semibold text-sm">{topContributor.name}</p>
            <p className="text-xs opacity-75">
              {topContributor.tasksCompleted} tasks completed
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" layout>
        {paginatedItems.map((member, index) => (
          <AnimatedCard key={member.id} index={index}>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 font-semibold text-foreground bg-muted">
                    {member.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {member.email}
                    </p>
                    {member.name === topContributor.name && (
                      <p className="text-xs bg-muted text-foreground px-2 py-1 rounded mt-1 inline-block">
                        👑 Admin
                      </p>
                    )}
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3 text-center text-xs">
                <div>
                  <p className="font-bold text-base text-foreground">
                    {member.tasksCompleted}
                  </p>
                  <p className="text-muted-foreground">Completed</p>
                </div>
                <div>
                  <p className="font-bold text-base text-foreground">
                    {member.tasksAssigned}
                  </p>
                  <p className="text-muted-foreground">Assigned</p>
                </div>
                <div>
                  <p className="font-bold text-base text-foreground">
                    {member.totalTasks}
                  </p>
                  <p className="text-muted-foreground">Total</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Member since {member.joinedDate}
              </p>
            </div>
          </AnimatedCard>
        ))}
      </motion.div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="border border-border rounded-lg p-4 bg-card"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-lg">💌</span>
          <h3 className="font-semibold text-sm md:text-base text-foreground">
            Invite New Members
          </h3>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mb-4">
          Share this invite link with new household members to join your chore
          wheel.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            readOnly
            value="https://chorewheel.app/invite/apartment4b"
            className="flex-1 px-3 py-2 border border-border rounded-lg bg-input text-foreground text-xs truncate"
          />
          <button
            onClick={handleCopyInvite}
            className="bg-accent text-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/80 transition-colors text-xs whitespace-nowrap w-full sm:w-auto"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </motion.div>

      <InviteMemberModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </div>
  )
}

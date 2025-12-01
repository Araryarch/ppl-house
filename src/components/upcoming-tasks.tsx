'use client'

import { useHouseholdStore } from '@/store/household-store'
import { ScrollArea } from '@/components/ui/scroll-area'

export function UpcomingTasks() {
  const chores = useHouseholdStore((state) => state.chores)
  const members = useHouseholdStore((state) => state.members)

  const pendingChores = chores
    .filter((c) => !c.completed)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 10)

  return (
    <div className="border border-border rounded-2xl p-6 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📅</span>
        <h3 className="font-bold text-foreground">Upcoming Tasks</h3>
      </div>
      <ScrollArea className="h-64">
        <div className="space-y-4 pr-4">
          {pendingChores.length === 0 ? (
            <p className="text-sm text-muted-foreground">No upcoming tasks</p>
          ) : (
            pendingChores.map((task) => {
              const member = members.find((m) => m.id === task.assignedTo)
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">
                      {member?.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {task.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member?.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {task.dueDate}
                  </p>
                </div>
              )
            })
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

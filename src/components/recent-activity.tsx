'use client'

import { useHouseholdStore } from '@/store/household-store'
import { ScrollArea } from '@/components/ui/scroll-area'

export function RecentActivity() {
  const notifications = useHouseholdStore((state) => state.notifications)
  const members = useHouseholdStore((state) => state.members)

  const recentActivities = notifications
    .filter((n) => n.type === 'success')
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 10)

  const getMemberAvatar = (memberId?: string) => {
    return members.find((m) => m.id === memberId)?.avatar || '👤'
  }

  return (
    <div className="border border-border rounded-2xl p-6 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">⚡</span>
        <h3 className="font-bold text-foreground">Recent Activity</h3>
      </div>
      <ScrollArea className="h-64">
        <div className="space-y-4 pr-4">
          {recentActivities.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No recent activities
            </p>
          ) : (
            recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 pb-4 border-b border-border last:border-0"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">
                  {getMemberAvatar(activity.memberId)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">
                    {activity.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useHouseholdStore } from '@/store/household-store'

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const notifications = useHouseholdStore((state) => state.notifications)
  const removeNotification = useHouseholdStore(
    (state) => state.removeNotification,
  )
  const markNotificationAsRead = useHouseholdStore(
    (state) => state.markNotificationAsRead,
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  const typeColors = {
    success: 'bg-accent text-accent-foreground',
    info: 'bg-secondary text-secondary-foreground',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-destructive text-destructive-foreground',
  }

  const typeIcons = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    error: '✕',
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-muted rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <span className="text-lg">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Notifications</h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No notifications
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-muted/50 transition-colors ${
                    !notification.read ? 'bg-muted/30' : ''
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold ${typeColors[notification.type]}`}
                    >
                      {typeIcons[notification.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeNotification(notification.id)
                      }}
                      className="text-muted-foreground hover:text-foreground text-lg shrink-0"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

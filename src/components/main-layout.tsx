'use client'

import { useState, type ReactNode } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { Dashboard } from './dashboard'
import { ChoresPage } from './chores-page'
import { MembersPage } from './members-page'
import { SettingsPage } from './settings-page'
import { Navigation } from './navigation'
import { ThemeToggle } from './theme-toggle'
import { NotificationCenter } from './notification-center'

export type Page = 'dashboard' | 'chores' | 'members' | 'settings'

export function MainLayout({ children }: { children?: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <div className="p-8">Please log in</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="w-full px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center gap-3 mb-4 md:mb-5">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">
                Apartment 4B
              </h1>
              <p className="text-xs text-muted-foreground">4 members</p>
            </div>
            <div className="flex items-center gap-2">
              <NotificationCenter />
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                {user.avatar}
              </div>
            </div>
          </div>
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>

      <main className="w-full px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {children ? (
            children
          ) : (
            <>
              {currentPage === 'dashboard' && <Dashboard />}
              {currentPage === 'chores' && <ChoresPage />}
              {currentPage === 'members' && <MembersPage />}
              {currentPage === 'settings' && <SettingsPage />}
            </>
          )}
        </div>
      </main>

      <ThemeToggle />
    </div>
  )
}

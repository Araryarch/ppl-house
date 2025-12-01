'use client'

import type { Dispatch, SetStateAction } from 'react'

type Page = 'dashboard' | 'chores' | 'members' | 'settings'

interface NavigationProps {
  currentPage: Page
  onPageChange: Dispatch<SetStateAction<Page>>
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const pages: Page[] = ['dashboard', 'chores', 'members', 'settings']
  const labels: Record<Page, string> = {
    dashboard: 'Dashboard',
    chores: 'Chores',
    members: 'Members',
    settings: 'Settings',
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 md:px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
            currentPage === page
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-foreground hover:bg-accent'
          }`}
        >
          {labels[page]}
        </button>
      ))}
    </div>
  )
}

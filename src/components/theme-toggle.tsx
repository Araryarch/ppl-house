'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [hasTheme, setHasTheme] = useState(() => theme !== undefined)

  // If theme is not yet available, don't render the toggle.
  if (!hasTheme && theme === undefined) return null

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    setHasTheme(true)
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

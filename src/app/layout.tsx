import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '../context/auth-context'
import { HouseholdProvider } from '../context/household-context'
import { ThemeProvider } from '@/components/theme-provider'
import { MainLayout } from '@/components/main-layout'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chore Manager - Household Task Management',
  description:
    'Manage household chores and tasks efficiently with rotation strategies',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <HouseholdProvider>
              <MainLayout />
            </HouseholdProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

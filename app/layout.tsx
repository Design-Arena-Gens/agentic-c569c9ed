import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI System Boot Sequence',
  description: 'Cinematic AI System Initialization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

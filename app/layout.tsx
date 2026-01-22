import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LM Residence - Room Availability',
  description: 'Manage room availability for LM Residence',
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

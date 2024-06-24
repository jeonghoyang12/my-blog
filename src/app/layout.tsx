import type { Metadata } from 'next'
import './globals.css'

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

export const metadata: Metadata = {
  title: {
    template: '%s | DKRM Studio',
    default: 'My blog',
  },
  description: 'This is the blog powered by Next.js and Notion.',
}

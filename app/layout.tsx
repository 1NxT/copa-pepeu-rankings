import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Copa Pepeu - Ranking de Títulos',
  description: 'Ranking oficial dos campeões da Copa Pepeu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

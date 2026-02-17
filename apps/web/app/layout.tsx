import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Manuel Manero | Marca Pessoal Milionária',
  description: 'Construa uma Marca Pessoal Milionária com comunicação estratégica e IA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  )
}

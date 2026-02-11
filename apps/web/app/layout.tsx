import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Manuel Manero | Marca Pessoal Milionária',
  description: 'Ecossistema para empreendedores construirem marca pessoal forte, comunicarem com impacto e alcançarem resultados escaláveis.',
  keywords: 'marca pessoal, coaching, empreendedorismo, comunicação, personal branding',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://manuelmanero.com',
    siteName: 'Manuel Manero',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630',
        width: 1200,
        height: 630,
        alt: 'Manuel Manero - Marca Pessoal Milionária',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          {/* Header will be added here */}
          <main className="flex-1">{children}</main>
          {/* Footer will be added here */}
        </div>
      </body>
    </html>
  )
}

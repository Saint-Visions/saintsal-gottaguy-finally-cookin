import '../client/global.css'
import { ReactNode } from 'react'
import { ClientProviders } from '@/providers/ClientProviders'
import { BuilderInit } from '@/components/BuilderInit'

export const metadata = {
  title: 'SaintVisionAI™ - Cookin\' Knowledge',
  description: 'AI doesn\'t just answer. It adapts. It empowers. It becomes your enterprise companion.',
  keywords: 'AI, SaintVisionAI, Enterprise AI, Knowledge Management, CRM, Business Intelligence',
  openGraph: {
    title: 'SaintVisionAI™ - Cookin\' Knowledge',
    description: 'AI doesn\'t just answer. It adapts. It empowers. It becomes your enterprise companion.',
    url: 'https://saintvisionai.com',
    siteName: 'SaintVisionAI',
    images: [
      {
        url: 'https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F863b231460314ff6a606ebae2dd4912a',
        width: 1200,
        height: 630,
        alt: 'SaintVisionAI Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaintVisionAI™ - Cookin\' Knowledge',
    description: 'AI doesn\'t just answer. It adapts. It empowers. It becomes your enterprise companion.',
    images: ['https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F863b231460314ff6a606ebae2dd4912a'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientProviders>
          <BuilderInit />
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/layout/CustomCursor'

const ibmMono = IBM_Plex_Mono({
  variable: '--font-ibm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

const ibmSans = IBM_Plex_Sans({
  variable: '--font-ibm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.samihhabbani.com'),
  title: 'Samih Habbani — Full Stack Developer · AI Instructor · Content Creator',
  description:
    'Portfolio de Samih Habbani — Full Stack Developer, Digital & AI Instructor, Content Creator. Je construis des systèmes, transmets des compétences, crée du contenu.',
  openGraph: {
    title: 'Samih Habbani — Full Stack Developer · AI Instructor · Content Creator',
    description:
      'Portfolio de Samih Habbani — Full Stack Developer, Digital & AI Instructor, Content Creator. Je construis des systèmes, transmets des compétences, crée du contenu.',
    url: 'https://www.samihhabbani.com',
    siteName: 'Samih Habbani',
    images: ['/samih.webp'],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samih Habbani — Full Stack Developer · AI Instructor · Content Creator',
    description:
      'Portfolio de Samih Habbani — Full Stack Developer, Digital & AI Instructor, Content Creator.',
    images: ['/samih.webp'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${ibmMono.variable} ${ibmSans.variable}`}
    >
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}

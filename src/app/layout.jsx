// src/app/layout.jsx
import '../styles/globals.css'
import Nav from '../components/Nav'

const siteUrl = 'https://ptememories.com'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PTE Memories — Real Exam Memories, Verified & Free',
    template: '%s | PTE Memories',
  },
  description: 'PTE students share what they remember after their exam. Every memory is admin-verified and organised by section, date, and question type. Free forever. No Telegram chaos.',
  keywords: [
    'PTE exam memories', 'PTE Academic', 'PTE preparation', 'PTE practice',
    'PTE speaking questions', 'PTE writing questions', 'PTE listening questions',
    'PTE reading questions', 'PTE exam 2026', 'PTE study', 'Pearson VUE PTE',
    'PTE Write from Dictation', 'PTE Read Aloud', 'PTE Retell Lecture',
    'PTE exam questions', 'PTE memories bank', 'free PTE prep',
  ],
  authors: [{ name: 'PTE Memories' }],
  creator: 'PTE Memories',
  publisher: 'PTE Memories',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'PTE Memories',
    title: 'PTE Memories — Real Exam Memories, Verified & Free',
    description: 'PTE students share what they remember after their exam. Admin-verified, organised by section and date. Free forever.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PTE Memories' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PTE Memories — Real Exam Memories, Verified & Free',
    description: 'PTE students share what they remember after their exam. Admin-verified, organised by section and date. Free forever.',
    images: ['/og-image.png'],
  },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg', apple: '/favicon.svg' },
  alternates: { canonical: siteUrl },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#4F46E5" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'PTE Memories',
              url: siteUrl,
              description: 'PTE students share what they remember after their exam. Admin-verified memories organised by section, date, and question type.',
              potentialAction: {
                '@type': 'SearchAction',
                target: siteUrl + '/memories?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}

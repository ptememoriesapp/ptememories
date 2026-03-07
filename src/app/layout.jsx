// src/app/layout.jsx
import '../styles/globals.css'
import Nav from '../components/Nav'

export const metadata = {
  title: 'PTE Memories Hub — Real Exam Memories, Verified & Free',
  description: 'PTE students share what they remember after their exam. Every memory is admin-verified and organised by section, date, and question type.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}

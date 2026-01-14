import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import "bootstrap-icons/font/bootstrap-icons.css";
export const metadata: Metadata = {
  title: "Hackerrupt'26",
  description: 'national level hackathon organized by ACE SVCE',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      {/* Remove ${GeistSans.variable} and font-sans from here */}
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

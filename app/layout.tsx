import type {Metadata} from 'next'
import './globals.css'
import {defaultMetadata} from '@/lib/metadata'
import JsonLd from '@/components/json-ld'
import {Toaster} from '@/components/ui/sonner'

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  )
}

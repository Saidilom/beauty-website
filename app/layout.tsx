import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beauty Store',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      </head>
      <body className="w-full max-w-[100vw] overflow-x-hidden">{children}</body>
    </html>
  )
}


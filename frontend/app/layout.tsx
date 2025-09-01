import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Chatbot from '../components/Chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Explore Medical Tourism Worlwide',
  description: 'Compare medical procedure costs between US and international destinations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
          <Chatbot />
        </div>
      </body>
    </html>
  )
}

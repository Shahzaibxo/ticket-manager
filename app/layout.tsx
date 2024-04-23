import '@radix-ui/themes/styles.css';
import "./theme-config.css"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {AuthContextProvider} from "./context/AuthContext"
import Navbar from './Navbar'
import { Theme } from '@radix-ui/themes';


const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: 'Ticket manager - CRM',
  description: 'Register your complains by creating a ticket and allow us to review',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
        <Theme>
          <Navbar />
          <main className='mt-6 px-3'>
            {children}
          </main>
        </Theme>
        </AuthContextProvider>
      </body>
    </html>

  )
}



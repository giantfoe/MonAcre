import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PrivyAuthProvider } from "@/components/privy-provider"
import { AuthProvider } from '@/contexts/auth-context'
import { GlobalProviders } from '@/components/providers';

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <GlobalProviders>
          <PrivyAuthProvider>
            <Header />
            {children}
          </PrivyAuthProvider>
        </GlobalProviders>
      </body>
    </html>
  )
}

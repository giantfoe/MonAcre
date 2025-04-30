import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PrivyAuthProvider } from '@/components/privy-provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SolFund | Fractional Asset Ownership on Solana",
  description: "Democratizing access to income-generating assets in emerging markets through blockchain technology",
  generator: 'v0.dev',
  icons: {
    icon: "/images/monacre logo.png",
    shortcut: "/images/monacre logo.png",
    apple: "/images/monacre logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PrivyAuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </PrivyAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

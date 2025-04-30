"use client"

import { usePrivy } from '@privy-io/react-auth'
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function PrivyWalletConnect() {
  const { login, logout, authenticated, user, ready } = usePrivy()
  const { toast } = useToast()

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleLogin = async () => {
    try {
      await login()
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  // If Privy is still initializing, show a loading state
  if (!ready) {
    return (
      <Button
        variant="outline"
        className="relative overflow-hidden border-white/20 text-white hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-sm"
        disabled
      >
        <span className="flex items-center relative z-10">
          <Wallet className="mr-2 h-4 w-4" />
          Loading...
        </span>
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      className="relative overflow-hidden border-white/20 text-white hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-sm"
      onClick={authenticated ? handleLogout : handleLogin}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
      {authenticated && user ? (
        <span className="flex items-center relative z-10">
          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
          {user.wallet?.address ? formatWalletAddress(user.wallet.address) : "Connected"}
        </span>
      ) : (
        <span className="flex items-center relative z-10">
          <Wallet className="mr-2 h-4 w-4" />
          Signup
        </span>
      )}
    </Button>
  )
}
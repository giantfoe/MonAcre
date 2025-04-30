"use client"

import { usePrivy, User } from '@privy-io/react-auth'
import { useToast } from '@/components/ui/use-toast'

export function usePrivyAuth() {
  const { login, logout, authenticated, user, ready } = usePrivy()
  const { toast } = useToast()

  const handleLogin = async () => {
    try {
      await login()
      return true
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
      return true
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: authenticated,
    user,
    isLoading: !ready,
    walletAddress: user?.wallet?.address || null,
  }
}
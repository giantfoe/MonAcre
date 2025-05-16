"use client"

import { useContext, useState, useEffect } from 'react'; // Added useContext, useState, useEffect
import { usePrivy, User } from '@privy-io/react-auth';
import { useToast } from '@/components/ui/use-toast';
// Assuming Wallet type might be defined elsewhere or needs to be imported
// import { Wallet } from '@/types/wallet'; // Example import

// Assuming PrivyContext and SolanaContext are defined and exported from their respective files
// import { PrivyContext } from '@/contexts/privy-context'; // Example import
// import { SolanaContext } from '@/contexts/solana-context'; // Example import

export const usePrivyAuth = () => {
  const { login, logout, authenticated, user, ready } = usePrivy();
  const { toast } = useToast();

  // Removed direct useContext calls for PrivyContext and SolanaContext as usePrivy should provide necessary auth details.
  // If connection, wallet, and balance are needed, they should be sourced from appropriate contexts/hooks.
  // const { login: privyLogin } = useContext(PrivyContext); // This seems redundant if usePrivy is used
  // const { connection } = useContext(SolanaContext); // This should come from a Solana specific context hook
  
  // const [wallet, setWallet] = useState<Wallet | null>(null); // State for wallet, ensure Wallet type is defined/imported
  // const [balance, setBalance] = useState<number>(0); // State for balance

  useEffect(() => {
    // Initialization logic if needed, e.g., fetching wallet details based on user
  }, [user]); // Added user dependency if logic depends on it

  // Return what's provided by usePrivy and toast for now
  // Add other necessary values like wallet, balance, connection once their source is clear

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
"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useToast } from '@/components/ui/use-toast'
import { WalletError } from '@solana/wallet-adapter-base'

// Dynamically import WalletMultiButton with SSR disabled
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export default function CustomWalletConnect() {
  const { publicKey, connected, connecting, connect, select, wallets, wallet, disconnect } = useWallet()
  const { signInWithWallet, user, walletUser, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isConnecting, setIsConnecting] = useState(false)

  // Handle wallet connection errors
  useEffect(() => {
    const onError = (error: WalletError) => {
      console.error('Wallet connection error:', error)
      toast({
        title: "Wallet Connection Error",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
      setIsConnecting(false)
    }

    // Add and remove the event listener
    if (wallet) {
      wallet.adapter.on('error', onError)
      return () => {
        wallet.adapter.off('error', onError)
      }
    }
  }, [wallet, toast])

  useEffect(() => {
    const handleWalletConnection = async () => {
      if (connected && publicKey && !user && !isConnecting) {
        setIsConnecting(true)
        try {
          await signInWithWallet(publicKey.toString())
        } catch (error: any) {
          console.error('Error signing in with wallet:', error)
          
          // Show toast notification for errors
          toast({
            title: "Authentication Error",
            description: error.message || "There was a problem connecting your wallet. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsConnecting(false)
        }
      }
      
      // Redirect to profile page if wallet is connected but profile is not completed
      if (connected && user && walletUser && walletUser.profile_completed === false) {
        router.push('/profile')
      }
    }

    handleWalletConnection()
  }, [connected, publicKey, user, walletUser, signInWithWallet, router, toast, isConnecting])

  // Handle manual wallet connection
  const handleManualConnect = async () => {
    if (connecting || connected) return
    
    try {
      // If no wallet is selected, show the wallet modal
      if (!wallet && wallets.length > 0) {
        // Select the first available wallet (usually Phantom)
        select(wallets[0].adapter.name)
      }
      
      // Try to connect after a short delay
      setTimeout(async () => {
        try {
          await connect()
        } catch (error) {
          console.error('Manual connect error:', error)
          toast({
            title: "Connection Failed",
            description: "Please make sure your wallet extension is unlocked and try again.",
            variant: "destructive",
          })
        }
      }, 100)
    } catch (error) {
      console.error('Wallet selection error:', error)
    }
  }

  return (
    <div onClick={handleManualConnect}>
      <WalletMultiButton />
    </div>
  )
}
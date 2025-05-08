"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function FallbackWalletConnect() {
  const { select, connect, wallets, connecting } = useWallet()
  const { toast } = useToast()

  const handleConnect = async () => {
    try {
      if (wallets.length === 0) {
        toast({
          title: "No Wallets Found",
          description: "Please install a Solana wallet extension like Phantom or Solflare.",
          variant: "destructive",
        })
        return
      }

      // Select the first wallet (usually Phantom)
      select(wallets[0].adapter.name)
      
      // Try to connect
      setTimeout(async () => {
        try {
          await connect()
        } catch (error) {
          console.error('Connect error:', error)
          toast({
            title: "Connection Failed",
            description: "Please make sure your wallet is unlocked and try again.",
            variant: "destructive",
          })
        }
      }, 100)
    } catch (error) {
      console.error('Wallet connection error:', error)
      toast({
        title: "Error",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button 
      onClick={handleConnect}
      disabled={connecting}
      className="gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700" // Applied Connect Wallet style
    >
      {connecting ? "Connecting..." : "Connect Wallet (Fallback)"}
    </Button>
  )
}
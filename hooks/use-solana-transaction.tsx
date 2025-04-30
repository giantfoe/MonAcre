"use client"

import { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useSendTransaction } from '@privy-io/react-auth/solana'
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useToast } from '@/components/ui/use-toast'

export function useSolanaTransaction() {
  const { user, authenticated, ready } = usePrivy()
  const { sendTransaction } = useSendTransaction()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  // Get the user's wallet address
  const walletAddress = user?.wallet?.address || null

  // Create a connection to Solana devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

  // Function to send SOL to another address
  const sendSol = async (recipientAddress: string, amount: number) => {
    if (!authenticated || !walletAddress) {
      toast({
        title: "Not authenticated",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return null
    }

    try {
      setIsProcessing(true)

      // Convert amount to lamports (1 SOL = 1,000,000,000 lamports)
      const lamports = amount * 1_000_000_000

      // Create a transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: new PublicKey(recipientAddress),
          lamports,
        })
      )

      // Send the transaction
      const result = await sendTransaction({
        transaction,
        connection,
      })

      toast({
        title: "Transaction sent",
        description: `Transaction signature: ${result.signature.slice(0, 8)}...`,
      })

      return result
    } catch (error) {
      console.error("Error sending transaction:", error)
      toast({
        title: "Transaction failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      })
      return null
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    sendSol,
    isProcessing,
    walletAddress,
    isReady: ready && authenticated,
  }
}
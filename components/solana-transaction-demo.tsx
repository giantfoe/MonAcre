"use client"

import { useState } from 'react'
import { useSolanaTransaction } from '@/hooks/use-solana-transaction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function SolanaTransactionDemo() {
  const { sendSol, isProcessing, walletAddress, isReady } = useSolanaTransaction()
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('0.01')

  const handleSendTransaction = async () => {
    await sendSol(recipientAddress, parseFloat(amount))
  }

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send SOL</CardTitle>
        <CardDescription>
          Send SOL to another wallet using your embedded Solana wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isReady ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Your Wallet:</span>
              <span className="text-sm font-mono bg-secondary p-1 rounded">
                {formatWalletAddress(walletAddress || '')}
              </span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter recipient's Solana address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (SOL)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.000000001"
                step="0.01"
              />
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="mb-4">Connect your wallet to send SOL</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          onClick={handleSendTransaction} 
          disabled={!isReady || isProcessing || !recipientAddress || parseFloat(amount) <= 0}
          className="w-full gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700" // Applied Connect Wallet style
        >
          {isProcessing ? "Processing..." : "Send SOL"}
        </Button>
      </CardFooter>
    </Card>
  )
}
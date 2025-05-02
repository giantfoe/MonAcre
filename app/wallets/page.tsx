"use client"

import { useWallet } from '@/hooks/use-wallet'
import { Button } from '@/components/ui/button'
import { Wallet, Plus, ChevronDown, Copy, LogOut } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWallets } from '@privy-io/react-auth'
import { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import Image from 'next/image'

export default function WalletsPage() {
  const { activeWallet, setActiveWallet } = useWallet()
  const { wallets } = useWallets()
  const { user, login } = usePrivy()
  const [ethBalance, setEthBalance] = useState<string>('0.00')
  const [solBalance, setSolBalance] = useState<string>('0.00')

  const formattedAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`

  const handleDisconnect = (chainId: string) => {
    const wallet = wallets.find(w => w.chainId === chainId)
    wallet?.disconnect()
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Wallet Management</h1>
      </div>

      <Card className="border-white/10 bg-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-xl">Connected Wallets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {wallets.map((wallet) => (
            <div key={wallet.address} className="p-4 border rounded-lg border-white/20">
              <div className="flex items-center gap-4">
                <Image 
                  src={wallet.chainId === 'ethereum' ? '/eth-logo.svg' : '/solana-logo.svg'} 
                  alt={`${wallet.chainId} logo`}
                  width={32}
                  height={32}
                />
                <div>
                  <h3 className="font-medium">
                    {wallet.chainId.charAt(0).toUpperCase() + wallet.chainId.slice(1)} Wallet
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      {formattedAddress(wallet.address)}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 text-muted-foreground hover:text-white"
                      onClick={() => navigator.clipboard.writeText(wallet.address)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono">
                  {wallet.chainId === 'ethereum' ? ethBalance : solBalance} {wallet.chainId === 'ethereum' ? 'ETH' : 'SOL'}
                </span>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDisconnect(wallet.chainId)}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <Button 
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={login}
            >
              <Plus className="w-4 h-4" />
              Connect New Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
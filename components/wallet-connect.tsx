"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet } from "lucide-react"

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)

  // This is a placeholder for actual wallet connection logic
  const handleConnect = (walletType: string) => {
    console.log(`Connecting to ${walletType} wallet...`)
    // In a real implementation, this would connect to the Solana wallet
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    console.log("Disconnecting wallet...")
    // In a real implementation, this would disconnect the wallet
    setIsConnected(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950 dark:hover:text-green-400"
        >
          {isConnected ? (
            <span className="flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              0x1a2...3b4c
            </span>
          ) : (
            <span className="flex items-center">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isConnected ? "Wallet Connected" : "Connect Wallet"}</DialogTitle>
          <DialogDescription>
            {isConnected
              ? "Your wallet is connected to SolFund."
              : "Connect your Solana wallet to create pools, invest, and manage your assets."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {isConnected ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Wallet Address</p>
                  <p className="text-sm text-gray-500">0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => console.log("Copy address")}>
                  Copy
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Balance</p>
                  <p className="text-sm text-gray-500">12.345 SOL</p>
                </div>
              </div>
              <Button variant="destructive" onClick={handleDisconnect}>
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              <Button className="flex items-center justify-between" onClick={() => handleConnect("Phantom")}>
                <span>Phantom</span>
                <span className="h-6 w-6 rounded-full bg-gray-200"></span>
              </Button>
              <Button className="flex items-center justify-between" onClick={() => handleConnect("Solflare")}>
                <span>Solflare</span>
                <span className="h-6 w-6 rounded-full bg-gray-200"></span>
              </Button>
              <Button className="flex items-center justify-between" onClick={() => handleConnect("Backpack")}>
                <span>Backpack</span>
                <span className="h-6 w-6 rounded-full bg-gray-200"></span>
              </Button>
              <Button className="flex items-center justify-between" onClick={() => handleConnect("Glow")}>
                <span>Glow</span>
                <span className="h-6 w-6 rounded-full bg-gray-200"></span>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

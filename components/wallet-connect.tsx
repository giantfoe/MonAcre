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
          className="relative overflow-hidden border-purple-600 text-purple-600 hover:text-purple-700 dark:border-purple-500 dark:text-purple-500 dark:hover:text-purple-400 transition-all duration-300 font-medium shadow-subtle"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          {isConnected ? (
            <span className="flex items-center relative z-10">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              0x1a2...3b4c
            </span>
          ) : (
            <span className="flex items-center relative z-10">
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
              <div className="flex items-center justify-between rounded-lg border p-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
                <div>
                  <p className="font-medium">Wallet Address</p>
                  <p className="text-sm text-gray-500 mt-1 font-mono">0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:border-purple-300 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/30"
                >
                  Copy
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
                <div>
                  <p className="font-medium">Balance</p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <span className="font-mono">12.345 SOL</span>
                    <span className="ml-2 text-xs text-green-600 dark:text-green-400">(≈ $1,234.50)</span>
                  </p>
                </div>
              </div>
              <Button variant="destructive" onClick={handleDisconnect} className="mt-2">
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              <Button
                className="flex items-center justify-between relative overflow-hidden transition-all duration-300 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700 h-14"
                onClick={() => handleConnect("Phantom")}
              >
                <span className="flex items-center">
                  <span className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="h-4 w-4 rounded-full bg-purple-600"></span>
                  </span>
                  <span className="font-medium">Phantom</span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Popular</span>
              </Button>
              <Button
                className="flex items-center justify-between relative overflow-hidden transition-all duration-300 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700 h-14"
                onClick={() => handleConnect("Solflare")}
              >
                <span className="flex items-center">
                  <span className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <span className="h-4 w-4 rounded-full bg-orange-600"></span>
                  </span>
                  <span className="font-medium">Solflare</span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Recommended</span>
              </Button>
              <Button
                className="flex items-center justify-between relative overflow-hidden transition-all duration-300 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700 h-14"
                onClick={() => handleConnect("Backpack")}
              >
                <span className="flex items-center">
                  <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="h-4 w-4 rounded-full bg-blue-600"></span>
                  </span>
                  <span className="font-medium">Backpack</span>
                </span>
              </Button>
              <Button
                className="flex items-center justify-between relative overflow-hidden transition-all duration-300 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700 h-14"
                onClick={() => handleConnect("Glow")}
              >
                <span className="flex items-center">
                  <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="h-4 w-4 rounded-full bg-green-600"></span>
                  </span>
                  <span className="font-medium">Glow</span>
                </span>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

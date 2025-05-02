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
import { Wallet, Zap } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function WalletConnect() {
  const { user, walletUser, isLoading, signInWithWallet, signOut } = useAuth()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  
  const isConnected = !!user && !!walletUser

  // Handle wallet connection
  // Remove Ethereum mock address generation
  const handleConnect = async (walletType: string) => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        throw new Error("Solana wallet not detected");
      }
      
      const publicKey = await window.solana.connect();
      await signInWithWallet(publicKey.toString());
      
      toast({
        title: "Solana Wallet Connected",
        description: `Successfully connected ${walletType} wallet`,
      });
      
      setIsOpen(false);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect Solana wallet",
        variant: "destructive",
      });
    }
  }

  const handleDisconnect = async () => {
    try {
      await signOut()
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
      setIsOpen(false)
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative overflow-hidden border-white/20 text-white hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-sm"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          {isConnected ? (
            <span className="flex items-center relative z-10">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              {formatWalletAddress(walletUser?.wallet_address || "")}
            </span>
          ) : (
            <span className="flex items-center relative z-10">
              <Wallet className="mr-2 h-4 w-4" />
              Signup/Sign-in
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>{isConnected ? "Wallet Connected" : "Connect Wallet"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {isConnected
              ? "Your wallet is connected to MonAcre."
              : "Connect your Solana wallet to create pools, invest, and manage your assets."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : isConnected ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg border border-white/10 p-4 bg-black/30">
                <div>
                  <p className="font-medium text-white">Wallet Address</p>
                  <p className="text-sm text-gray-400 mt-1 font-mono">{walletUser?.wallet_address}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-400 border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
                  onClick={() => {
                    navigator.clipboard.writeText(walletUser?.wallet_address || "")
                    toast({
                      title: "Copied",
                      description: "Wallet address copied to clipboard",
                    })
                  }}
                >
                  Copy
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/10 p-4 bg-black/30">
                <div>
                  <p className="font-medium text-white">Balance</p>
                  <p className="text-sm text-gray-400 mt-1 flex items-center">
                    <span className="font-mono">12.345 SOL</span>
                    <span className="ml-2 text-xs text-green-400">(≈ $1,234.50)</span>
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
                className="flex items-center justify-between relative overflow-hidden transition-all duration-300 bg-black/50 hover:bg-black/70 text-white border border-white/10 h-14 group"
                onClick={() => handleConnect("Phantom")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="flex items-center relative z-10">
                  <span className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mr-3">
                    <Zap className="h-3 w-3 text-white" />
                  </span>
                  <span className="font-medium">Phantom</span>
                </span>
                <span className="text-xs text-purple-400 relative z-10">Popular</span>
              </Button>
              
              {/* ... existing code for other wallet options ... */}
              <Button
                className="flex items-center justify-between relative overflow-hidden transition-all duration-300 bg-black/50 hover:bg-black/70 text-white border border-white/10 h-14 group"
                onClick={() => handleConnect("Solflare")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="flex items-center relative z-10">
                  <span className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mr-3">
                    <Zap className="h-3 w-3 text-white" />
                  </span>
                  <span className="font-medium">Solflare</span>
                </span>
                <span className="text-xs text-orange-400 relative z-10">Recommended</span>
              </Button>
              <Button
                className="flex items-center justify-between relative overflow-hidden transition-all duration-300 bg-black/50 hover:bg-black/70 text-white border border-white/10 h-14 group"
                onClick={() => handleConnect("Backpack")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="flex items-center relative z-10">
                  <span className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                    <Zap className="h-3 w-3 text-white" />
                  </span>
                  <span className="font-medium">Backpack</span>
                </span>
              </Button>
              <Button
                className="flex items-center justify-between relative overflow-hidden transition-all duration-300 bg-black/50 hover:bg-black/70 text-white border border-white/10 h-14 group"
                onClick={() => handleConnect("Glow")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="flex items-center relative z-10">
                  <span className="h-6 w-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3">
                    <Zap className="h-3 w-3 text-white" />
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

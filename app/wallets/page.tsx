"use client"

import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'; // Added import
import { Button } from '@/components/ui/button'
import { 
  Wallet, 
  Plus, 
  Copy, 
  LogOut, 
  ArrowUpRight, 
  ArrowDownLeft,
  ExternalLink,
  RefreshCw,
  HelpCircle
} from 'lucide-react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function WalletsPage() {
  const { publicKey, connected, disconnect, connecting, wallet, error, connect } = useWallet() // Added connect and error
  const { setVisible } = useWalletModal(); // Added useWalletModal
  const { user, authenticated } = usePrivy()
  const { toast } = useToast()
  const [solBalance, setSolBalance] = useState<string>('0.00')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [showNewUserGuide, setShowNewUserGuide] = useState(false)
  const [stakedBalance, setStakedBalance] = useState<string>('0.00') // Added for staked balance

  // Helper function to format addresses
  const formattedAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`

  // Fetch wallet balance
  const fetchWalletBalance = async (address: string) => {
    try {
      setIsRefreshing(true)
      const response = await fetch(`/api/wallet?address=${address}&action=balance&type=solana`)
      const data = await response.json()
      
      if (data.balance) {
        setSolBalance(data.balance)
      }
      setIsRefreshing(false)
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
      setIsRefreshing(false)
    }
  }

  // Refresh balances
  const refreshBalances = async () => {
    if (publicKey) {
      await fetchWalletBalance(publicKey.toString())
      
      toast({
        title: "Balances Updated",
        description: "Your wallet balances have been refreshed.",
      })
    }
  }

  // Fetch wallet data on component mount or when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      fetchWalletBalance(publicKey.toString())
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      })
    }
  }, [connected, publicKey, toast]) // Added toast to dependency array

  // Effect to handle wallet connection errors
  useEffect(() => {
    if (error) {
      console.error('Wallet connection error:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]) // Removed semicolon from this line

  const handleConnectWallet = async () => {
    try {
      await connect()
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      })
    } catch (error) {
      console.error('Error connecting wallet:', error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDisconnectWallet = async () => {
    try {
      await disconnect()
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  return (
    <div className="container max-w-5xl py-12 bg-black text-white">

      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">Wallet Management</h1>
        <p className="text-gray-300"> 
          Connect your wallet to manage your assets and perform transactions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-6">
          <Card className="border-gray-700 bg-gray-900 text-white overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center justify-between text-white">
                <span>Your Wallet</span>
                {connected && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 gap-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={refreshBalances}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!connected ? (
                <div className="text-center py-8 space-y-4">
                  <div className="mx-auto bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center">
                    <Wallet className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-gray-300">No wallet connected</p> {/* Adjusted */}
                    <p className="text-xs text-gray-500 mt-1">
                      Connect your wallet to manage your assets
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button 
                      className="gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700" // This is the style to replicate
                      onClick={() => setVisible(true)} 
                      disabled={connecting}
                    >
                      {connecting ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4" />
                          Connect Wallet
                        </>
                      )}
                    </Button>
                    
                    <Dialog open={showNewUserGuide} onOpenChange={setShowNewUserGuide}>
                      <DialogTrigger asChild>
                        <Button variant="link" className="ml-2 text-gray-400 hover:text-white">
                          <HelpCircle className="h-4 w-4 mr-1" />
                          New to Web3?
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-gray-900 text-white border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-white">New to Web3? Get Started</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Learn how to set up your first crypto wallet
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <h3 className="font-medium text-white">What is a Wallet?</h3>
                            <p className="text-sm text-gray-300"> {/* Adjusted */}
                              A crypto wallet is like a digital bank account that lets you store, send, and receive digital assets.
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-medium text-white">Recommended Wallets</h3>
                            <div className="grid grid-cols-2 gap-3">
                              <a 
                                href="https://phantom.app/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-3 border border-gray-700 rounded-lg hover:bg-gray-800"
                              >
                                <Image 
                                  src="/images/phantom-logo.png" 
                                  alt="Phantom Wallet" 
                                  width={40} 
                                  height={40} 
                                />
                                <span className="mt-2 text-sm text-white">Phantom</span>
                                <span className="text-xs text-gray-400">Popular & Easy to Use</span>
                              </a>
                              <a 
                                href="https://solflare.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-3 border border-gray-700 rounded-lg hover:bg-gray-800"
                              >
                                <Image 
                                  src="/images/solflare-logo.png" 
                                  alt="Solflare Wallet" 
                                  width={40} 
                                  height={40} 
                                />
                                <span className="mt-2 text-sm text-white">Solflare</span>
                                <span className="text-xs text-gray-400">Feature-rich</span>
                              </a>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-medium text-white">Getting Started</h3>
                            <ol className="text-sm text-gray-300 list-decimal pl-5 space-y-1"> {/* Adjusted */}
                              <li>Install a wallet extension from the links above</li>
                              <li>Create a new wallet and securely save your recovery phrase</li>
                              <li>Return to this page and click "Connect Wallet"</li>
                            </ol>
                          </div>
                          
                          <div className="pt-2">
                            <Button 
                              variant="outline" 
                              className="w-full gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700" // Applied Connect Wallet style
                              onClick={() => setShowNewUserGuide(false)}
                            >
                              Got it
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ) : (
                <div className="p-5 border rounded-lg border-gray-700 bg-black hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image 
                          src="/images/sierra-leone-coast.jpeg" 
                          alt="Solana logo"
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-gray-900"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-white">
                          Solana Wallet
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-400 font-mono">
                            {publicKey ? formattedAddress(publicKey.toString()) : ''}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5 text-gray-400 hover:text-white hover:bg-gray-700"
                            onClick={() => {
                              if (publicKey) {
                                navigator.clipboard.writeText(publicKey.toString())
                                toast({
                                  title: "Address Copied",
                                  description: "Wallet address copied to clipboard",
                                })
                              }
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleDisconnectWallet}
                      className="text-gray-400 hover:text-white hover:bg-red-900/50"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-300">Balance</p> {/* Adjusted */}
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-mono font-medium text-white">
                            {solBalance}
                          </p>
                          <p className="text-gray-400">
                            SOL
                          </p>
                          <p className="text-xs text-green-400">
                            {`≈ $${(parseFloat(solBalance) * 100).toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button 
                          size="sm"
                          className="gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700" // Applied Connect Wallet style
                        >
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          Send
                        </Button>
                        <Button 
                          size="sm"
                          className="gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700" // Applied Connect Wallet style
                        >
                          <ArrowDownLeft className="h-4 w-4 mr-1" />
                          Receive
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>Staked</span>
                        <span>Available</span>
                      </div>
                      <Progress 
                        value={((parseFloat(stakedBalance) / (parseFloat(stakedBalance) + parseFloat(solBalance) || 1)) * 100)} 
                        className="h-2 bg-gray-700" 
                      />
                      <div className="flex items-center justify-between text-xs mt-2">
                        <span className="text-gray-300">
                          {stakedBalance} SOL
                        </span>
                        <span className="text-gray-300">
                          {solBalance} SOL
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card className="border-gray-700 bg-gray-900 text-white">
            <CardHeader>
              <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full justify-start gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700" // Applied Connect Wallet style
                disabled={!connected}
              >
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Send Tokens
              </Button>
              <Button 
                className="w-full justify-start gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700" // Applied Connect Wallet style
                disabled={!connected}
              >
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Receive Tokens
              </Button>
              <Button 
                className="w-full justify-start gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700" // Applied Connect Wallet style
                disabled={!connected}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Buy Crypto
              </Button>
              <Link href="/profile" className="block">
                <Button className="w-full justify-start gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700"> {/* Applied Connect Wallet style */}
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
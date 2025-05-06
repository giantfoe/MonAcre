"use client"

import { useWallet } from '@/hooks/use-wallet'
import { Button } from '@/components/ui/button'
import { 
  Wallet, 
  Plus, 
  Copy, 
  LogOut, 
  ArrowUpRight, 
  ArrowDownLeft,
  ExternalLink,
  RefreshCw
} from 'lucide-react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { useWallets } from '@privy-io/react-auth'
import { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'

export default function WalletsPage() {
  const { activeWallet, setActiveWallet } = useWallet()
  const { wallets } = useWallets()
  const { user, login } = usePrivy()
  const { toast } = useToast()
  const [solBalance, setSolBalance] = useState<string>('0.00')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [transactions, setTransactions] = useState([])

  // Helper function to identify wallet type
  const getWalletType = (address: string) => {
    if (address.startsWith('0x')) {
      return 'ethereum'
    } else {
      return 'solana'
    }
  }

  // Helper function to format addresses
  const formattedAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`
    
  // Get Solana wallet from the list of wallets
  const getSolanaWallet = () => {
    if (!wallets || wallets.length === 0) return null
    
    // First try to find by chainId (Privy sometimes uses 'solana' as chainId)
    const solanaByChainId = wallets.find(wallet => 
      wallet.chainId === 'solana'
    )
    
    if (solanaByChainId) return solanaByChainId
    
    // Then try to find by address format (non-0x and appropriate length)
    return wallets.find(wallet => 
      !wallet.address.startsWith('0x') && 
      wallet.address.length >= 32 && 
      wallet.address.length <= 44
    )
  }
  
  // Get Ethereum wallet from the list of wallets
  const getEthereumWallet = () => {
    if (!wallets || wallets.length === 0) return null
    
    return wallets.find(wallet => wallet.address.startsWith('0x'))
  }

  // Fetch wallet balance
  const fetchWalletBalance = async (address: string, type: string) => {
    try {
      const response = await fetch(`/api/wallet?address=${address}&action=balance&type=${type}`)
      const data = await response.json()
      
      if (data.balance) {
        setSolBalance(data.balance)
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
    }
  }

  // Refresh balances
  const refreshBalances = async () => {
    setIsRefreshing(true)
    
    const solanaWallet = getSolanaWallet()
    if (solanaWallet) {
      await fetchWalletBalance(solanaWallet.address, 'solana')
    }
    
    setIsRefreshing(false)
    
    toast({
      title: "Balances Updated",
      description: "Your wallet balances have been refreshed.",
    })
  }

  // Fetch wallet data on component mount
  useEffect(() => {
    if (wallets && wallets.length > 0) {
      const solanaWallet = getSolanaWallet()
      if (solanaWallet) {
        fetchWalletBalance(solanaWallet.address, 'solana')
      }
    }
  }, [wallets])

  // Debug wallet information
  useEffect(() => {
    if (wallets && wallets.length > 0) {
      console.log('All wallets:', JSON.stringify(wallets, null, 2))
      wallets.forEach((wallet, index) => {
        console.log(`Wallet ${index}:`, {
          address: wallet.address,
          chainId: wallet.chainId,
          isEthereum: wallet.address.startsWith('0x'),
          addressLength: wallet.address.length,
          allProps: Object.keys(wallet)
        })
      })
    }
    
    // Also log user data from Privy
    if (user) {
      console.log('Privy user data:', user)
      console.log('Linked accounts:', user.linkedAccounts)
    }
  }, [wallets, user])

  const handleDisconnect = (wallet: any) => {
    if (wallet && wallet.disconnect) {
      wallet.disconnect()
      toast({
        title: "Wallet Disconnected",
        description: `Your wallet has been disconnected.`,
      })
    }
  }

  // Get the Solana wallet for display
  const solanaWallet = getSolanaWallet()
  const ethereumWallet = getEthereumWallet()

  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Wallet Management</h1>
        <p className="text-muted-foreground">
          Connect, manage, and monitor your crypto wallets across different blockchains.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-6">
          <Card className="border-white/10 bg-gray-900/80 backdrop-blur-sm text-white overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center justify-between">
                <span>Connected Wallets</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 gap-1 text-xs text-muted-foreground hover:text-white"
                  onClick={refreshBalances}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!solanaWallet && !ethereumWallet ? (
                <div className="text-center py-8 space-y-4">
                  <div className="mx-auto bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center">
                    <Wallet className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">No wallets connected</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Connect a wallet to manage your assets
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Display Solana Wallet */}
                  {solanaWallet && (
                    <div className="p-5 border rounded-lg border-white/10 bg-black/30 hover:bg-black/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Image 
                              src="/images/solana-logo.svg" 
                              alt="Solana logo"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-gray-900"></div>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">
                              Solana Wallet
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-muted-foreground font-mono">
                                {formattedAddress(solanaWallet.address)}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5 text-muted-foreground hover:text-white"
                                onClick={() => {
                                  navigator.clipboard.writeText(solanaWallet.address)
                                  toast({
                                    title: "Address Copied",
                                    description: "Wallet address copied to clipboard",
                                  })
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
                          onClick={() => handleDisconnect(solanaWallet)}
                          className="text-muted-foreground hover:text-white hover:bg-red-500/10"
                        >
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Balance</p>
                            <div className="flex items-baseline gap-2">
                              <p className="text-2xl font-mono font-medium">
                                {solBalance}
                              </p>
                              <p className="text-muted-foreground">
                                SOL
                              </p>
                              <p className="text-xs text-green-400">
                                {`≈ $${(parseFloat(solBalance) * 100).toFixed(2)}`}
                              </p>
                            </div>
                          </div>
                          <div className="space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-white/10 hover:bg-white/5"
                            >
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-white/10 hover:bg-white/5"
                            >
                              <ArrowDownLeft className="h-4 w-4 mr-1" />
                              Receive
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Staked</span>
                            <span>Available</span>
                          </div>
                          <Progress value={30} className="h-2 bg-white/5" />
                          <div className="flex items-center justify-between text-xs mt-2">
                            <span className="text-muted-foreground">
                              3.5 SOL
                            </span>
                            <span className="text-muted-foreground">
                              8.845 SOL
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Display Ethereum Wallet */}
                  {ethereumWallet && (
                    <div className="p-5 border rounded-lg border-white/10 bg-black/30 hover:bg-black/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Image 
                              src="/images/eth-logo.svg" 
                              alt="Ethereum logo"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-gray-900"></div>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">
                              Ethereum Wallet
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-muted-foreground font-mono">
                                {formattedAddress(ethereumWallet.address)}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5 text-muted-foreground hover:text-white"
                                onClick={() => {
                                  navigator.clipboard.writeText(ethereumWallet.address)
                                  toast({
                                    title: "Address Copied",
                                    description: "Wallet address copied to clipboard",
                                  })
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
                          onClick={() => handleDisconnect(ethereumWallet)}
                          className="text-muted-foreground hover:text-white hover:bg-red-500/10"
                        >
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Balance</p>
                            <div className="flex items-baseline gap-2">
                              <p className="text-2xl font-mono font-medium">
                                0.00
                              </p>
                              <p className="text-muted-foreground">
                                ETH
                              </p>
                              <p className="text-xs text-green-400">
                                ≈ $0.00
                              </p>
                            </div>
                          </div>
                          <div className="space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-white/10 hover:bg-white/5"
                              disabled
                            >
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-white/10 hover:bg-white/5"
                              disabled
                            >
                              <ArrowDownLeft className="h-4 w-4 mr-1" />
                              Receive
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="mt-6">
                <Button 
                  className="w-full gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-12"
                  onClick={login}
                >
                  <Plus className="w-4 h-4" />
                  Connect New Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card className="border-white/10 bg-gray-900/80 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Send Tokens
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5">
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Receive Tokens
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5">
                <Wallet className="mr-2 h-4 w-4" />
                Buy Crypto
              </Button>
              <Link href="/profile" className="block">
                <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
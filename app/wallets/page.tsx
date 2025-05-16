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
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, createTransferInstruction as createSplTransferInstruction } from '@solana/spl-token' // Renamed to avoid conflict
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation" // Added import
import { useAuth } from "@/contexts/auth-context" // Added import
import { supabase } from "@/lib/supabase" // Added import
import Link from 'next/link'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePrivyAuth } from "@/hooks/use-privy-auth"

export const dynamic = "force-dynamic" // Added to ensure dynamic rendering for auth state

export default function WalletsPage() {
  const { publicKey, connected, disconnect, connecting, wallet, error, connect } = useWallet() // Added connect and error
  const { setVisible } = useWalletModal(); // Added useWalletModal
  const { user, authenticated, login } = usePrivy() // Added login for Privy
  const { user: authUser, walletUser, isLoading: authIsLoading } = useAuth() // Renamed to avoid conflict, added walletUser and isLoading
  const router = useRouter() // Added for navigation
  const { toast } = useToast()
  const [solBalance, setSolBalance] = useState<string>('0.00')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [showNewUserGuide, setShowNewUserGuide] = useState(false)
  const [stakedBalance, setStakedBalance] = useState<string>('0.00') // Added for staked balance

  // Profile form state
  const [profileFormData, setProfileFormData] = useState({
    name: "",
    email: "",
    bio: "",
  })
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false)
  const [profileMounted, setProfileMounted] = useState(false)

  // State for receive dialog
  const [showReceiveDialog, setShowReceiveDialog] = useState(false)

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

  // Effect for profile completion logic, similar to ProfilePage
  useEffect(() => {
    setProfileMounted(true)
  }, [])

  useEffect(() => {
    if (!profileMounted) return

    // Fetch existing profile data if user is available and profile not complete
    if (authUser && walletUser && !walletUser.profile_completed) {
      const fetchUserProfile = async () => {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', authUser.id)
          .single()
          
        if (data && !error) {
          setProfileFormData({
            name: data.name || "",
            email: data.email || (authUser as any).email || "", // Cast authUser to any to access email if available from Privy
            bio: data.bio || "",
          })
        } else if (error && error.code !== 'PGRST116') { // PGRST116: no rows found
          console.error("Error fetching user profile:", error)
        }
      }
      fetchUserProfile()
    } else if (authUser && walletUser && walletUser.profile_completed) {
      // If profile is already completed, ensure form data is not stale or empty
      // This might not be strictly necessary if the form is hidden when profile is complete
    }
  }, [authUser, walletUser, profileMounted, router])

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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!authUser) {
      toast({
        title: "Error",
        description: "You must be logged in to complete your profile",
        variant: "destructive"
      })
      return
    }
    
    setIsProfileSubmitting(true)
    
    try {
      // Update user_profiles table
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: authUser.id,
          name: profileFormData.name,
          email: profileFormData.email,
          bio: profileFormData.bio,
          updated_at: new Date().toISOString()
        })
      
      if (profileError) throw profileError
      
      // Mark profile as completed in wallet_users table
      const { error: walletError } = await supabase
        .from('wallet_users')
        .update({ profile_completed: true })
        .eq('id', authUser.id)
      
      if (walletError) throw walletError
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
      // Optionally, force a re-fetch or update of walletUser state if not automatically handled by useAuth
      // router.push("/dashboard") // Or simply hide the form
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error Updating Profile",
        description: (error as Error).message || "There was a problem updating your profile.",
        variant: "destructive"
      })
    } finally {
      setIsProfileSubmitting(false)
    }
  }

  // Hooks must be called unconditionally at the top level.
  const { login: handleLogin, isAuthenticated, user: privyUser, isLoading: privyLoading } = usePrivyAuth();

  // Loading state for auth
  if (authIsLoading || !profileMounted || privyLoading) { // Added privyLoading to the condition
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // If not authenticated via Privy, show login/connect prompt
  // This check might need refinement based on how `authUser` and `walletUser` are populated
  if (!isAuthenticated || !authUser) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-screen">
        <Card className="w-full max-w-md bg-gray-900 text-white border-gray-700">
          <CardHeader>
            <CardTitle className="text-center">Connect Wallet & Sign In</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Please connect your wallet and sign in to manage your account and complete your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={handleLogin}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Connect Wallet & Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-12 bg-black text-white">

      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">Wallet Management</h1>
        <p className="text-gray-300"> 
          Connect your wallet to manage your assets and perform transactions.
        </p>
      </div>

      {/* Profile Completion Section - Show if profile is not completed */}
      {authUser && walletUser && !walletUser.profile_completed && (
        <Card className="mb-8 border-gray-700 bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-xl text-white">Complete Your Profile</CardTitle>
            <CardDescription className="text-gray-400">
              Provide some additional information to complete your account setup.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleProfileSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="profile-name" className="font-medium text-gray-300">Full Name</Label>
                <Input
                  id="profile-name"
                  name="name"
                  value={profileFormData.name}
                  onChange={handleProfileChange}
                  placeholder="E.g., Ada Lovelace"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email" className="font-medium text-gray-300">Email Address</Label>
                <Input
                  id="profile-email"
                  name="email"
                  type="email"
                  value={profileFormData.email}
                  onChange={handleProfileChange}
                  placeholder="E.g., ada@example.com"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-bio" className="font-medium text-gray-300">Bio</Label>
                <Textarea
                  id="profile-bio"
                  name="bio"
                  value={profileFormData.bio}
                  onChange={handleProfileChange}
                  placeholder="Tell us a bit about yourself (optional)"
                  rows={3}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isProfileSubmitting}
              >
                {isProfileSubmitting ? "Saving Profile..." : "Save Profile"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}


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
                      {/* Action Buttons will be handled by the new Send/Receive sections */}
                    </div>

                    {/* Receive Section */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <Button 
                        onClick={() => setShowReceiveDialog(true)}
                        className="w-full gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700"
                      >
                        <ArrowDownLeft className="h-4 w-4" />
                        Receive Tokens / Top Up
                      </Button>
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

      {/* Receive Dialog */}
      <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
        <DialogContent className="sm:max-w-md bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Receive Tokens</DialogTitle>
            <DialogDescription className="text-gray-400">
              Share your wallet address or QR code to receive tokens.
            </DialogDescription>
          </DialogHeader>
          {publicKey ? (
            <div className="py-4 space-y-4">
              {/* <div className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded-lg bg-gray-800">
                <QRCode 
                  value={publicKey.toString()} 
                  size={128} 
                  bgColor="#1f2937" // bg-gray-800
                  fgColor="#ffffff" // text-white
                  level="H"
                />
              </div> */}
              <div className="p-3 border border-gray-700 rounded-lg bg-gray-800">
                <p className="text-sm text-gray-400 break-all font-mono">
                  {publicKey.toString()}
                </p>
              </div>
              <Button 
                className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent"
                onClick={() => {
                  navigator.clipboard.writeText(publicKey.toString())
                  toast({
                    title: "Address Copied",
                    description: "Wallet address copied to clipboard",
                  })
                  setShowReceiveDialog(false)
                }}
              >
                <Copy className="h-4 w-4" />
                Copy Address
              </Button>
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">Connect your wallet to see your address.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
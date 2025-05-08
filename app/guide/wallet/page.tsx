"use client"

import { Button } from '@/components/ui/button'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import { ArrowLeft, ExternalLink } from 'lucide-react'

export default function WalletGuidePage() {
  const { connectWallet } = usePrivy()

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <Link href="/wallets" className="flex items-center text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Wallet Management
        </Link>
      </div>
      
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Getting Started with Web3 Wallets</h1>
        <p className="text-muted-foreground">
          A comprehensive guide to help you set up your first crypto wallet and start your web3 journey.
        </p>
      </div>
      
      <div className="space-y-8">
        <Card className="border-white/10 bg-gray-900/80 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>What is a Crypto Wallet?</CardTitle>
            <CardDescription className="text-muted-foreground">
              Understanding the basics of blockchain wallets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              A crypto wallet is a digital tool that allows you to interact with blockchain networks. 
              Unlike traditional wallets, crypto wallets don't actually store your cryptocurrency. 
              Instead, they store your private keys - the passwords that give you access to your crypto assets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Store and manage your private keys</li>
                  <li>Send and receive cryptocurrency</li>
                  <li>Interact with decentralized applications (dApps)</li>
                  <li>View your transaction history</li>
                </ul>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <h3 className="font-medium mb-2">Types of Wallets:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Browser extensions (MetaMask, Phantom)</li>
                  <li>Mobile apps (Trust Wallet, Rainbow)</li>
                  <li>Hardware wallets (Ledger, Trezor)</li>
                  <li>Web-based wallets (less secure)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/10 bg-gray-900/80 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>Recommended Wallets</CardTitle>
            <CardDescription className="text-muted-foreground">
              Popular and user-friendly wallet options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <Image 
                  src="/images/metamask-logo.svg" 
                  alt="MetaMask logo"
                  width={64}
                  height={64}
                  className="mb-4"
                />
                <h3 className="font-medium text-lg">MetaMask</h3>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  Most popular wallet for Ethereum and EVM-compatible chains
                </p>
                <a 
                  href="https://metamask.io/download/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Download <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              
              <div className="flex flex-col items-center p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <Image 
                  src="/images/phantom-logo.svg" 
                  alt="Phantom logo"
                  width={64}
                  height={64}
                  className="mb-4"
                />
                <h3 className="font-medium text-lg">Phantom</h3>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  Leading wallet for Solana with Ethereum support
                </p>
                <a 
                  href="https://phantom.app/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Download <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              
              <div className="flex flex-col items-center p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <Image 
                  src="/images/rainbow-logo.svg" 
                  alt="Rainbow logo"
                  width={64}
                  height={64}
                  className="mb-4"
                />
                <h3 className="font-medium text-lg">Rainbow</h3>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  Beautiful, user-friendly Ethereum wallet
                </p>
                <a 
                  href="https://rainbow.me/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Download <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/10 bg-gray-900/80 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>Setting Up Your First Wallet</CardTitle>
            <CardDescription className="text-muted-foreground">
              Step-by-step guide to creating a new wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">1. Download and Install</h3>
              <p className="text-sm text-muted-foreground">
                Choose a wallet from the recommended options above and download the appropriate version for your device.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">2. Create a New Wallet</h3>
              <p className="text-sm text-muted-foreground">
                Open the wallet application and select "Create a new wallet" or similar option.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">3. Secure Your Recovery Phrase</h3>
              <p className="text-sm text-muted-foreground">
                You'll be shown a recovery phrase (usually 12 or 24 words). This is extremely important!
              </p>
              <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-sm font-medium text-red-400">CRITICAL SECURITY STEP:</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-red-300 mt-2">
                  <li>Write down your recovery phrase on paper (not digitally)</li>
                  <li>Store it in a secure, private location</li>
                  <li>Never share it with anyone</li>
                  <li>If you lose it, you'll permanently lose access to your funds</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">4. Set a Password</h3>
              <p className="text-sm text-muted-foreground">
                Create a strong password to protect access to your wallet application.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">5. Connect to Our Platform</h3>
              <p className="text-sm text-muted-foreground">
                Return to our platform and click "Connect Wallet" to link your new wallet.
              </p>
              <Button 
                onClick={() => connectWallet()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Connect Your Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-white/10 bg-gray-900/80 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>Safety Tips</CardTitle>
            <CardDescription className="text-muted-foreground">
              Important security practices for wallet management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">Never Share Recovery Phrases</h3>
              <p className="text-sm text-muted-foreground">
                Your recovery phrase is the master key to your crypto assets. 
                Never share it with anyone, including platform support staff.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Verify Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Always double-check transaction details before confirming, 
                especially recipient addresses and amounts.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Use Hardware Wallets</h3>
              <p className="text-sm text-muted-foreground">
                For large holdings, use a hardware wallet for cold storage. 
                Keep only small amounts in hot wallets for daily use.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
"use client"

import { usePrivy } from '@privy-io/react-auth'
import { useSolanaWallets } from '@privy-io/react-auth/solana'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

// Change to use Solana wallet adapter
import { useWallet } from '@solana/wallet-adapter-react';

// Fix hook name and structure
export function useSolanaWallet() {
  const { publicKey, connect, disconnect } = useWallet();
  const { toast } = useToast();

  // Remove Ethereum-specific methods
  const handleConnect = async () => {
    try {
      await connect();
      return true;
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect Solana wallet",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    walletAddress: publicKey?.toBase58() || null,
    isConnected: !!publicKey,
    connect,
    disconnect
  };
}

// Remove duplicate implementation at bottom
const { login, authenticated, user } = usePrivy()
const { walletAddress: solanaWallet, isConnected, connect, disconnect } = useSolanaWallet()
const { toast } = useToast()
const [isSigningMessage, setIsSigningMessage] = useState(false)

// Sign a message with the Solana wallet
const signMessage = async (message: string) => {
  if (!authenticated || !solanaWallet) {
    toast({
      title: "Wallet not connected",
      description: "Please connect your wallet first",
      variant: "destructive",
    })
    return null
  }

  try {
    setIsSigningMessage(true)
    
    // Convert the message to Uint8Array as required by Solana
    const messageBytes = new TextEncoder().encode(message)
    
    // Sign the message
    const { signature } = await window.solana.signMessage(messageBytes, "utf8")
    
    toast({
      title: "Message signed",
      description: "Your message was successfully signed",
    })
    
    return {
      signature,
      publicKey: solanaWallet,
    }
  } catch (error) {
    console.error("Error signing message:", error)
    toast({
      title: "Signing failed",
      description: "Failed to sign message with your wallet",
      variant: "destructive",
    })
    return null
  } finally {
    setIsSigningMessage(false)
  }
}

export function useSolanaWalletHook() {
  return {
  solanaWallet,
  walletAddress: solanaWallet || null,
  isConnected: authenticated && !!solanaWallet,
  signMessage,
  isSigningMessage,
  connectWallet: login,
}}
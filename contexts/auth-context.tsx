"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'

type WalletUser = {
  id: string
  wallet_address: string
  created_at: string
  last_login: string
  profile_completed?: boolean  // Add this property
}

type AuthContextType = {
  session: Session | null
  user: User | null
  walletUser: WalletUser | null
  isLoading: boolean
  signInWithWallet: (walletAddress: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [walletUser, setWalletUser] = useState<WalletUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Add this effect to handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only run this effect on the client side
    if (!mounted) return

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [mounted])

  // Fetch wallet user data when user changes
  useEffect(() => {
    const fetchWalletUser = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('wallet_users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error fetching wallet user:', error)
          return
        }

        setWalletUser(data)
      } else {
        setWalletUser(null)
      }
    }

    fetchWalletUser()
  }, [user])

  const signInWithWallet = async (walletAddress: string) => {
    // The 'user' object in context should be populated by Privy's auth flow via onAuthStateChange
    if (!user || !user.id) {
      toast.error("User not authenticated or user ID is missing. Please log in via Privy.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const privyUserId = user.id; // This is the Supabase user ID, managed by Privy

      // Check if a wallet_user record exists for this privyUserId (which is user.id from Supabase)
      let { data: walletProfile, error: fetchProfileError } = await supabase
        .from('wallet_users')
        .select('*')
        .eq('id', privyUserId) // 'id' in 'wallet_users' should be foreign key to 'auth.users.id'
        .maybeSingle();

      if (fetchProfileError) {
        console.error('Error fetching wallet profile:', fetchProfileError);
        throw fetchProfileError;
      }

      if (!walletProfile) {
        // Create a new wallet_user profile linked to the Privy/Supabase user ID
        const { data: newProfile, error: creationError } = await supabase
          .from('wallet_users')
          .insert([{
            id: privyUserId, // This is the key linking to auth.users table
            wallet_address: walletAddress,
            last_login: new Date().toISOString(),
            profile_completed: false, 
            // created_at is usually handled by DB default or trigger
          }])
          .select()
          .single();

        if (creationError) {
          console.error('Error creating wallet profile:', creationError);
          throw creationError;
        }
        setWalletUser(newProfile);
        walletProfile = newProfile;
        toast.success("New wallet profile created and linked to your account.");
      } else {
        // Update existing wallet_user profile
        const { data: updatedProfile, error: updateError } = await supabase
          .from('wallet_users')
          .update({
            wallet_address: walletAddress,
            last_login: new Date().toISOString(),
            // Optionally update other fields like profile_completed if applicable
          })
          .eq('id', privyUserId)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating wallet profile:', updateError);
          throw updateError;
        }
        setWalletUser(updatedProfile);
        walletProfile = updatedProfile;
        toast.success("Existing wallet profile updated.");
      }

      // After successfully creating/updating our DB, register with Reown API
      if (walletProfile) {
        // Determine chain - assuming Solana for now, this might need to be dynamic
        const chain = 'solana'; // This could come from wallet connection context if multi-chain
        const metadata = {
          userId: privyUserId, // Use the Supabase user ID (managed by Privy)
          walletType: chain, 
          // Add any other relevant metadata from Privy user object if available and needed
          // e.g., privyEmail: user.email, (if user object has email)
        };

        try {
          const reownResponse = await fetch('/api/register-wallet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: walletAddress, chain, metadata }),
          });

          if (!reownResponse.ok) {
            const reownErrorData = await reownResponse.json();
            throw new Error(reownErrorData.error || `Reown API responded with ${reownResponse.status}`);
          }
          const reownData = await reownResponse.json();
          toast.success(`Wallet registered with Reown successfully. Wallet ID: ${reownData.walletId || ''}`);
        } catch (reownError) {
          console.error('Failed to register wallet with Reown:', reownError);
          toast.error("Failed to register wallet with Reown: " + (reownError as Error).message);
          // Decide if this is a critical failure or if the app can proceed
        }
      }

    } catch (error) {
      console.error('Error in signInWithWallet:', error);
      toast.error("Wallet association failed: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
      setUser(null)
      setWalletUser(null)
      toast.success("Signed out successfully")
    } catch (error) {
      toast.error("Sign out failed: " + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  // Add this return statement with the context provider
  // Return a consistent UI for server and client
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        walletUser,
        isLoading,
        signInWithWallet,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
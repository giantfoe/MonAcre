"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
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

  useEffect(() => {
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
  }, [])

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
    try {
      setIsLoading(true);
      
      const { data: existingUser, error: fetchError } = await supabase
        .from('wallet_users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .maybeSingle();
  
      if (fetchError) throw fetchError;
  
      if (!existingUser) {
        const { data: newUser, error: creationError } = await supabase
          .from('wallet_users')
          .insert([{ 
            wallet_address: walletAddress,
            created_at: new Date().toISOString()
          }])
          .single();
  
        if (creationError) throw creationError;
        setUser(newUser);
      } else {
        setUser(existingUser);
      }
  
      // Get auth user data
      // Fix variable name mismatch
      const { data: authUser, error: authError } = await supabase
      .from('users')
      .select('email')
      .eq('id', existingUser.id)  // Changed from existingUsers.id
      .single();
  
      // Replace toast usage
      toast.success("Authentication successful");
    } catch (error) {
      toast.error("Authentication failed: " + (error as Error).message);
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
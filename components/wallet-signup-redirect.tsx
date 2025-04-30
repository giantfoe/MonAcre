"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/components/ui/use-toast'

export default function WalletSignupRedirect() {
  const { user, walletUser, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Only run this effect when we have a user and wallet data loaded
    if (isLoading) return
    
    if (user && walletUser) {
      // Check if profile is not completed
      if (!walletUser.profile_completed) {
        // Redirect to profile page to complete signup
        router.push('/profile')
        toast({
          title: "Complete your profile",
          description: "Please complete your profile to continue",
        })
      }
    }
  }, [user, walletUser, isLoading, router, toast])

  return null // This component doesn't render anything
}
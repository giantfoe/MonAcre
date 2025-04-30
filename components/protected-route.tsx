"use client"

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (ready && !authenticated) {
      toast({
        title: "Authentication Required",
        description: "Please connect your wallet to access this page",
        variant: "destructive",
      })
      router.push('/')
    }
  }, [authenticated, ready, router, toast])

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return <>{children}</>
}
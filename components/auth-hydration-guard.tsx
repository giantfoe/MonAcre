'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

export function AuthHydrationGuard({ children }: { 
  children: React.ReactNode 
}) {
  const [isHydrated, setIsHydrated] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setIsHydrated(true)
    if (!user) router.push('/login')
  }, [user, router])

  if (!isHydrated) return null

  return <>{children}</>
}
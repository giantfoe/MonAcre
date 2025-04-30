'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export function AuthHydrationGuard({ children }: { 
  children: React.ReactNode 
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (!user) router.push('/login');
  }, [user, router]);

  if (!isMounted) return null;

  return <>{children}</>;
}
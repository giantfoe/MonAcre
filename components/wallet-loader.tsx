'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { getSolanaBalance } from '@/lib/solana-service';

export default function WalletLoader({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { wallet, wallets, connecting, publicKey } = useWallet();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch balance when wallet is connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const solBalance = await getSolanaBalance(publicKey.toString());
          setBalance(solBalance);
        } catch (error) {
          console.error('Error fetching balance in loader:', error);
        }
      }
    };

    fetchBalance();
  }, [publicKey]);

  if (!isMounted) {
    return (
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
    );
  }

  // If connecting, show a connecting state
  if (connecting) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/sierra-leone-coast.jpeg" 
            alt="Sierra Leone Coast"
            width={40}
            height={40}
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="h-6 w-6 rounded-full border-2 border-t-transparent border-purple-500 animate-spin"></div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-4 text-sm font-medium">Connecting Wallet...</div>
          <div className="h-3 text-xs text-muted-foreground">Please approve the connection in your wallet</div>
        </div>
      </div>
    );
  }

  // If no wallet is available yet, show a loading state
  if (!wallet && wallets.length === 0) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <Image 
            src="/images/sierra-leone-coast.jpeg" 
            alt="Sierra Leone Coast"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
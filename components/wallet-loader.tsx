'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function WalletLoader({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { wallet, wallets } = useWallet();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-10 w-32 bg-gray-700/50 animate-pulse rounded-md"></div>;
  }

  // If no wallet is available yet, show a loading state
  if (!wallet && wallets.length === 0) {
    return <div className="h-10 w-32 bg-gray-700/50 animate-pulse rounded-md"></div>;
  }

  return <>{children}</>;
}
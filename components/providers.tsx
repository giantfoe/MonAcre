'use client';

import { AuthProvider } from '@/contexts/auth-context';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  // Configure wallets
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <AuthProvider>
        {children}
      </AuthProvider>
    </WalletProvider>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Wallet } from 'lucide-react';

export default function WalletSwitcher() {
  const { user, authenticated, ready, login } = usePrivy();
  const [activeWallet, setActiveWallet] = useState<'ethereum' | 'solana'>('ethereum');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!mounted) {
    return <div className="h-10 w-32 bg-gray-700/50 animate-pulse rounded-md"></div>;
  }

  // If Privy is not ready or user is not authenticated, show login button
  if (!ready || !authenticated) {
    return (
      <Button 
        onClick={login}
        className="relative overflow-hidden border-white/20 text-white hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-sm"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  // Get the active wallet address
  const getWalletAddress = () => {
    if (!user) return null;
    
    // Get embedded wallets
    const embeddedWallets = user.linkedAccounts.filter(
      account => account.type === 'wallet' && account.walletClientType === 'privy'
    );
    
    if (embeddedWallets.length === 0) return null;
    
    // Find the wallet for the active chain
    const wallet = embeddedWallets.find(wallet => {
      if (activeWallet === 'ethereum') {
        // Use optional chaining and type assertion
        return (wallet as any)?.chainName?.toLowerCase().includes('ethereum');
      } else {
        // Use optional chaining and type assertion
        return (wallet as any)?.chainName?.toLowerCase().includes('solana');
      }
    });
    
    // Use optional chaining and type assertion
    return (wallet as any)?.address || null;
  };

  const formatAddress = (address: string | null) => {
    if (!address) return 'No wallet';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const walletAddress = getWalletAddress();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative overflow-hidden border-white/20 text-white hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-sm"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          <span className="flex items-center relative z-10">
            <span className={`mr-2 h-2 w-2 rounded-full ${activeWallet === 'solana' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
            {activeWallet === 'solana' ? 'SOL: ' : 'ETH: '}
            {formatAddress(walletAddress)}
            <ChevronDown className="ml-2 h-4 w-4" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-white/10 text-white">
        <DropdownMenuItem onClick={() => setActiveWallet('ethereum')} className={activeWallet === 'ethereum' ? 'bg-white/10' : ''}>
          Switch to Ethereum
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setActiveWallet('solana')} className={activeWallet === 'solana' ? 'bg-white/10' : ''}>
          Switch to Solana
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
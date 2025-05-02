import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export const useWallet = () => {
  const { user, authenticated } = usePrivy();
  const [activeWallet, setActiveWallet] = useState<'ethereum' | 'solana'>('solana');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatWalletAddress = (address: string | null): string => {
    if (!address) return "No wallet";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getWalletAddress = (): string | null => {
    if (!user || !mounted) return null;
    
    const wallet = user.linkedAccounts.find(account => 
      account.type === 'wallet' && 
      (account as any).walletClientType?.toLowerCase() === activeWallet
    );
    
    return (wallet as any)?.address || null;
  };

  return {
    activeWallet,
    setActiveWallet,
    formattedAddress: formatWalletAddress(getWalletAddress()),
    getWalletAddress,
    authenticated,
    user
  };
};
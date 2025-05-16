'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Wallet } from 'lucide-react';
import { useWallet } from '@/hooks/use-wallet';

interface WalletSwitcherProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const WalletSwitcher: React.FC<WalletSwitcherProps> = ({ 
  className = '',
  variant = 'outline',
  size = 'default'
}) => {
  // Remove duplicate wallet state management
  const { activeWallet, setActiveWallet, authenticated } = useWallet();
  const { user, login } = usePrivy();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formattedAddress = useMemo(() => {
    if (!user?.wallet?.address) return "";
    return `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`;
  }, [user]);

  // Remove duplicate address formatting logic (already handled in useWallet hook)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          className="relative overflow-hidden border-white/20 text-white hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-sm"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <span className="flex items-center relative z-10">
            <Wallet className="mr-2 h-4 w-4" />
            {authenticated ? (
              <>
                <span className={`mr-2 h-2 w-2 rounded-full ${
                  activeWallet === 'solana' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <span className="cursor-pointer">
                  {formattedAddress}
                </span>
              </>
            ) : (
              "Signup/Sign-in"
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-white/10 text-white">
        <DropdownMenuItem 
          onClick={() => setActiveWallet('ethereum')} 
          className={activeWallet === 'ethereum' ? 'bg-white/10' : ''}
        >
          {activeWallet === 'ethereum' && '✓ '}Ethereum
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setActiveWallet('solana')} 
          className={activeWallet === 'solana' ? 'bg-white/10' : ''}
        >
          {activeWallet === 'solana' && '✓ '}Solana
        </DropdownMenuItem>
        <div className="border-t border-white/10 my-1" />
        <DropdownMenuItem
          onClick={login}
          className="hover:bg-white/10"
        >
          Connect Wallet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WalletSwitcher;
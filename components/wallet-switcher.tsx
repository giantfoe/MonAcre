'use client';

import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface WalletSwitcherProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const WalletSwitcher: React.FC<WalletSwitcherProps> = ({ 
  className,
  variant = "outline", // Default variant
  size = "default" // Default size
}) => {
  const router = useRouter(); // Initialize useRouter

  const handleNavigateToWallets = () => {
    router.push('/wallets');
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`bg-black text-white hover:bg-black/90 transition-all duration-300 font-medium ${className}`}
      onClick={handleNavigateToWallets} // Add onClick handler
    >
      {/* Remove gradient span */}
      <span className="flex items-center relative z-10">
        <Wallet className="mr-2 h-4 w-4" />
        Wallet
      </span>
    </Button>
  );
}

export default WalletSwitcher;
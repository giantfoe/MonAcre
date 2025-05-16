'use client';

import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2, Wallet } from 'lucide-react';

interface PrivySignupButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function PrivySignupButton({
  className = '',
  variant = 'default',
  size = 'default'
}: PrivySignupButtonProps) {
  const { login, ready } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignup}
      className={`bg-primary text-primary-foreground hover:bg-primary/90 ${className}`}
      variant={variant}
      size={size}
      disabled={isLoading || !ready}
      style={{ borderRadius: '8px', fontWeight: 600 }}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Signup/Sign-in
        </>
      )}
    </Button>
  );
}
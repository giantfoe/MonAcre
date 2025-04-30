'use client';

import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';

export default function NotFoundClient() {
  const { user, walletUser } = useAuth();
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      {user && <p>Hey {user.email || 'there'}, this page doesn't exist</p>}
    </div>
  );
}
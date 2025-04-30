'use client';

import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/auth-context';

const AuthMessage = () => {
  const { user } = useAuth();
  return user ? (
    <p className="text-lg mt-4 text-purple-500">
      Welcome back! This page doesn't exist.
    </p>
  ) : null;
};

export default dynamic(() => Promise.resolve(AuthMessage), {
  ssr: false // Critical for avoiding server-side context usage
});
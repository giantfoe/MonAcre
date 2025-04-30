'use client';

import { useAuth } from '@/contexts/auth-context';

export default function NotFoundClient() {
  const { user } = useAuth();
  
  return (
    <div className="container py-12 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      {user && <p className="text-lg">Welcome back! This page doesn't exist.</p>}
      <button 
        onClick={() => window.history.back()} 
        className="mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md text-white"
      >
        Go Back
      </button>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthMessage from './auth-message';

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="container py-12 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">The requested page doesn't exist</p>
      <Link 
        href="/"
        className="text-purple-500 hover:text-purple-700 transition-colors"
      >
        Return Home
      </Link>
      
      {mounted && <AuthMessage />}
      
      <button 
        onClick={() => window.history.back()} 
        className="mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md text-white"
      >
        Go Back
      </button>
    </div>
  );
}
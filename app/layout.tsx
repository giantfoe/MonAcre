// 'use client'; // Keep this if your simplified layout still needs client context, otherwise remove.
import './globals.css'; // Assuming this is essential and SSR-safe
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import { AuthProvider } from '@/contexts/auth-context'; // Added import
import { WalletProviders } from './providers'; // Import WalletProviders

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MonAcre App', // Basic metadata
  description: 'Simplified layout test',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <AuthProvider>
        <body className={inter.className}>>
        <WalletProviders> {/* Wrap Header and children with WalletProviders */}
          <Header />
          {children}
        </WalletProviders>
      </body>
      </AuthProvider>
    </html>
  );
}

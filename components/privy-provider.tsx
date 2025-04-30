"use client"

import { ReactNode } from 'react'
import { PrivyProvider } from '@privy-io/react-auth'

export function PrivyAuthProvider({ children }: { children: ReactNode }) {
  const privyAppId = "cma2u6fck01y0l80lht7irkf1"

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['email'],
        appearance: {
          theme: 'dark',
          accentColor: '#6366F1',
          logo: 'https://your-logo-url.com/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'all-users'
          // Remove requiredChains as it's not in the type definition
        },
        supportedChains: [
          {
            name: 'Solana',
            id: 101,
            nativeCurrency: {
              name: 'SOL',
              symbol: 'SOL',
              decimals: 9
            },
            rpcUrls: {
              default: { http: ['https://api.mainnet-beta.solana.com'] },
              public: { http: ['https://api.mainnet-beta.solana.com'] }
            }
          }
        ],
        defaultChain: {
          name: 'Solana',
          id: 101,
          nativeCurrency: {
            name: 'SOL',
            symbol: 'SOL',
            decimals: 9
          },
          rpcUrls: {
            default: { http: ['https://api.mainnet-beta.solana.com'] },
            public: { http: ['https://api.mainnet-beta.solana.com'] }
          }
        }
      }}
    >
      {children}
    </PrivyProvider>
  )
}
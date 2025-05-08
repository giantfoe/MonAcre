"use client";

import { PrivyProvider } from '@privy-io/react-auth';
import { useEffect } from 'react';

export default function PrivyAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#6366F1',
        },
        embeddedWallets: {
          createOnLogin: undefined, // Fix for error on line 21
          // Remove the noPromptOnSignature property as it's not supported
        },
        supportedChains: [
          {
            id: 1,
            name: 'Ethereum Mainnet',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: {
              default: {
                http: ['https://ethereum.publicnode.com']
              },
              public: {
                http: ['https://ethereum.publicnode.com']
              }
            }
          },
          {
            id: 137,
            name: 'Polygon Mainnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: {
              default: {
                http: ['https://polygon-rpc.com']
              },
              public: {
                http: ['https://polygon-rpc.com']
              }
            }
          },
          {
            id: 42161,
            name: 'Arbitrum One',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: {
              default: {
                http: ['https://arb1.arbitrum.io/rpc']
              },
              public: {
                http: ['https://arb1.arbitrum.io/rpc']
              }
            }
          },
          {
            id: 10,
            name: 'Optimism',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: {
              default: {
                http: ['https://mainnet.optimism.io']
              },
              public: {
                http: ['https://mainnet.optimism.io']
              }
            }
          },
          {
            id: 8453,
            name: 'Base',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: {
              default: {
                http: ['https://mainnet.base.org']
              },
              public: {
                http: ['https://mainnet.base.org']
              }
            }
          },
          // For Solana, make sure to use a number ID
          {
            id: 101, // Changed from '1' to 101 (Solana's chain ID)
            name: 'Solana',
            nativeCurrency: {
              name: 'Solana',
              symbol: 'SOL',
              decimals: 9
            },
            rpcUrls: {
              default: {
                http: ['https://api.mainnet-beta.solana.com']
              },
              public: {
                http: ['https://api.mainnet-beta.solana.com']
              }
            }
          },
        ],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
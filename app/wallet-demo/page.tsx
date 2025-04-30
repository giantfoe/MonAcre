"use client"

import SolanaTransactionDemo from '@/components/solana-transaction-demo'

export default function WalletDemoPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Solana Wallet Demo</h1>
      <SolanaTransactionDemo />
    </div>
  )
}
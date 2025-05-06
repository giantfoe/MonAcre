import { NextResponse } from 'next/server';
import { getSolanaBalance, getSolanaTransactions } from '@/lib/solana-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const action = searchParams.get('action');
  const walletType = searchParams.get('type') || 'solana'; // Default to solana
  
  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }
  
  try {
    // Handle Solana wallet data
    if (walletType === 'solana') {
      if (action === 'balance') {
        const balance = await getSolanaBalance(address);
        return NextResponse.json({ balance, walletType });
      } else if (action === 'transactions') {
        const transactions = await getSolanaTransactions(address);
        return NextResponse.json({ transactions, walletType });
      } else {
        // If no specific action is requested, return both balance and transactions
        const balance = await getSolanaBalance(address);
        const transactions = await getSolanaTransactions(address);
        return NextResponse.json({ 
          balance, 
          transactions, 
          walletType,
          address // Include the wallet address in the response
        });
      }
    } 
    // Handle Ethereum wallet data (you would implement this separately)
    else if (walletType === 'ethereum') {
      return NextResponse.json({ 
        error: 'Ethereum wallet data retrieval not yet implemented' 
      }, { status: 501 });
    }
    
    return NextResponse.json({ error: 'Invalid action or wallet type' }, { status: 400 });
  } catch (error) {
    console.error('Wallet API error:', error);
    return NextResponse.json({ error: 'Failed to fetch wallet data' }, { status: 500 });
  }
}
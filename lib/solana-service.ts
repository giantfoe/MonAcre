import { Connection, PublicKey, LAMPORTS_PER_SOL, ParsedTransactionWithMeta } from '@solana/web3.js';
import { clusterApiUrl } from '@solana/web3.js';

// Use devnet for testing, change to mainnet-beta for production
const connection = new Connection(clusterApiUrl('devnet'));

export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: string;
  token: string;
  address: string;
  timestamp: string;
  status: string;
}

export const getSolanaBalance = async (address: string): Promise<string> => {
  try {
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    return (balance / LAMPORTS_PER_SOL).toFixed(5);
  } catch (error) {
    console.error('Error fetching Solana balance:', error);
    return '0.00';
  }
};

export const getSolanaTransactions = async (address: string): Promise<Transaction[]> => {
  try {
    const publicKey = new PublicKey(address);
    
    // Get signatures for the address
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
    
    if (!signatures.length) return [];
    
    // Get transaction details
    const transactions = await connection.getParsedTransactions(
      signatures.map(sig => sig.signature)
    );
    
    return transactions
      .filter((tx): tx is ParsedTransactionWithMeta => tx !== null)
      .map((tx, index) => {
        const signature = signatures[index].signature;
        const accountKeys = tx.transaction.message.accountKeys;
        
        // Properly scoped variables
        const isReceiver = accountKeys.some((account, i) => 
            account.pubkey.toString() === address && 
            account.writable
        );
        
        // Get the other party's address (simplified)
        const otherParty = tx.transaction.message.accountKeys
          .find(account => account.pubkey.toString() !== address)?.pubkey.toString() || '';
        
        // Calculate amount (simplified - in real app you'd need to parse instructions)
        // This is a simplified example - actual implementation would need to parse instructions
        const amount = '0.1'; // Placeholder
        
        return {
          id: signature,
          type: isReceiver ? 'receive' : 'send',
          amount: amount,
          token: 'SOL',
          address: otherParty.slice(0, 4) + '...' + otherParty.slice(-4),
          timestamp: new Date(tx.blockTime ? tx.blockTime * 1000 : Date.now()).toISOString(),
          status: 'completed'
        };
      });  // Added missing closing bracket
  } catch (error) {
    console.error('Error fetching Solana transactions:', error);
    return [];
  }
};

// Remove these problematic lines at the end of the file:
// Change from:
// if (message.isAccountWritable(i)) {
// To:
// if (tx.transaction.message.accountKeys[i].isWritable) {
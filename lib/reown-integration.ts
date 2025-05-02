export interface ReownRegistrationPayload {
  address: string
  chain: 'ethereum' | 'solana'
  metadata: {
    userId: string
    walletType: string
    [key: string]: any
  }
}

export interface ReownRegistrationResponse {
  success: boolean
  walletId?: string
  error?: string
}

export const registerWalletWithReown = async (
  payload: ReownRegistrationPayload
): Promise<ReownRegistrationResponse> => {
  try {
    const response = await fetch('https://api.reown.com/v1/wallets/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REOWN_API_KEY}`,
        'Origin': window.location.origin
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error ${response.status}: ${errorData.message || 'Unknown error'}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Reown registration failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
};
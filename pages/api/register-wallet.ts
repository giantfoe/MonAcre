import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, chain, metadata } = req.body
  
  try {
    const reownResponse = await fetch('https://api.reown.com/v1/wallets/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REOWN_API_KEY}`
      },
      body: JSON.stringify({ address, chain, metadata })
    });
    
    const data = await reownResponse.json();
    res.status(reownResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to communicate with Reown API' 
    });
  }
}
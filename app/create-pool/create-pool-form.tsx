"use client"

import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePrivy } from '@privy-io/react-auth'; // Assuming Privy is used for auth and wallet
import { toast } from "sonner"; // Assuming sonner is used for toasts
import { useRouter } from 'next/navigation';

export default function CreatePoolForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [poolWalletAddress, setPoolWalletAddress] = useState(''); // New state for pool wallet address
  const [isLoading, setIsLoading] = useState(false);
  const { user } = usePrivy();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!user || !user.wallet) {
      toast.error("Please connect your wallet first.");
      setIsLoading(false);
      return;
    }

    const creator_wallet_address = user.wallet.address;
    const parsedFundingGoal = parseFloat(fundingGoal);

    if (isNaN(parsedFundingGoal) || parsedFundingGoal <= 0) {
      toast.error("Funding goal must be a positive number.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/pools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          funding_goal: parsedFundingGoal,
          creator_wallet_address,
          pool_wallet_address: poolWalletAddress, // Add new field
          status: 'open',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create pool');
      }

      toast.success("Pool created successfully!");
      // Optionally, redirect to the new pool's page or a dashboard
      // router.push(`/pool/${result.pool.id}`); 
      setName('');
      setDescription('');
      setFundingGoal('');
      setPoolWalletAddress(''); // Reset new field
    } catch (error: any) {
      console.error("Error creating pool:", error);
      toast.error(error.message || "An error occurred while creating the pool.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 md:p-8 bg-black text-white rounded-lg shadow-xl">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">Pool Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter pool name"
          required
          className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>
      <div>
        <Label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-300">Description (Optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your pool's purpose"
          rows={4}
          className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>
      <div>
        <Label htmlFor="fundingGoal" className="block text-sm font-medium mb-1 text-gray-300">Funding Goal (SOL)</Label>
        <Input
          id="fundingGoal"
          type="number"
          value={fundingGoal}
          onChange={(e) => setFundingGoal(e.target.value)}
          placeholder="e.g., 100"
          required
          min="0.01" 
          step="0.01"
          className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>
      <div>
        <Label htmlFor="poolWalletAddress" className="block text-sm font-medium mb-1 text-gray-300">Pool Wallet Address (SOL)</Label>
        <Input
          id="poolWalletAddress"
          type="text"
          value={poolWalletAddress}
          onChange={(e) => setPoolWalletAddress(e.target.value)}
          placeholder="Enter the Solana wallet address for this pool"
          required
          className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50">
        {isLoading ? 'Creating Pool...' : 'Create Pool'}
      </Button>
    </form>
  );
}
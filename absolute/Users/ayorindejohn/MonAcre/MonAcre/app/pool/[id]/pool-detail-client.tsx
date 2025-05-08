'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Corrected and completed import for lucide-react icons
import { AlertCircle, MapPin } from 'lucide-react'; 

// Define the Pool type (this should ideally be in a shared types/interfaces file)
interface Pool {
  id: string;
  title: string;
  description: string;
  category: string;
  monthlyReturn: string; // Or number, adjust based on your data model
  location: string;
  imageUrl?: string; // Optional: if you have images for pools
}

// Define props for the PoolDetailClient component
interface PoolDetailClientProps {
  params: { id: string }; // From Next.js dynamic route parameters
  pool: Pool; // The pool data to display
}

export default function PoolDetailClient({ params, pool }: PoolDetailClientProps) {
  const [investAmount, setInvestAmount] = useState<string>(""); // State for investment amount

  // Handler for investment amount input change
  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestAmount(e.target.value);
  };

  // Fallback UI if pool data is not available
  if (!pool) {
    return (
      <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-[calc(100vh-200px)]">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-xl text-muted-foreground">Pool details are currently unavailable.</p>
        <p className="text-sm text-muted-foreground">Please try again later or check the pool ID.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {pool.imageUrl && (
        <div className="mb-6 shadow-lg rounded-lg overflow-hidden">
          <img 
            src={pool.imageUrl} 
            alt={pool.title} 
            className="w-full h-auto max-h-[500px] object-cover" 
          />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Badge variant="outline" className="text-sm">{pool.category}</Badge>
                <Badge variant="secondary" className="text-sm">{pool.monthlyReturn} Monthly Return</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1.5 h-4 w-4" />
                  {pool.location}
                </div>
              </div>
              <CardTitle className="mb-3 text-3xl font-bold tracking-tight">{pool.title}</CardTitle>
              <CardDescription className="mb-6 text-base leading-relaxed">{pool.description}</CardDescription>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="investmentAmount" className="block text-md font-medium mb-2">
                    Investment Amount
                  </Label>
                  <Input
                    type="number"
                    id="investmentAmount"
                    value={investAmount}
                    onChange={handleInvestmentChange}
                    placeholder="Enter amount (e.g., 1000)"
                    className="mt-1 text-base"
                  />
                </div>
                <Button 
                  onClick={() => console.log("Invest clicked. Amount:", investAmount, "Pool ID:", pool.id)}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Invest Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          {/* Example sidebar for additional pool information or related actions */}
          <Card className="shadow-xl">
            <CardContent className="p-6 space-y-4">
              <CardTitle className="text-xl font-semibold">Pool Summary</CardTitle>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Pool ID</h4>
                <p className="text-base">{pool.id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Target</h4>
                <p className="text-base"> {/* Add target amount if available */}</p>
              </div>
              {/* Add more summary details as needed */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
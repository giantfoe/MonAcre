"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  Share2,
  ThumbsUp,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PoolDetailClientProps {
  params: { id: string }
}

export default function PoolDetailClient({ params }: PoolDetailClientProps) {
  const [investAmount, setInvestAmount] = useState("")
  
  // Mock data for the pool
  const pool = {
    id: params.id,
    title: "Taxi Fleet in Freetown",
    description:
      "Fund a fleet of 5 taxis operating in Freetown, Sierra Leone. Monthly profits distributed to all investors based on ownership percentage. Each taxi generates approximately $500 in monthly revenue with $300 in profit after expenses.",
    longDescription: `
      <p>This investment pool aims to fund the purchase of 5 Toyota Corolla vehicles to be used as taxis in Freetown, Sierra Leone. The taxis will operate in high-traffic areas of the city, providing reliable transportation services to locals and tourists.</p>
      
      <h3>Business Model</h3>
      <p>Each taxi will be operated by a vetted, experienced driver who will pay a daily fee to the pool. The drivers keep all fares collected during their shift, creating an incentive for them to maximize their earnings.</p>
      
      <h3>Revenue Breakdown</h3>
      <ul>
        <li>Each taxi generates approximately $30-40 per day in fees</li>
        <li>Monthly revenue per taxi: ~$900-1,200</li>
        <li>Monthly expenses (maintenance, fuel contribution, insurance): ~$400 per taxi</li>
        <li>Net monthly profit per taxi: ~$500-800</li>
      </ul>
      
      <h3>Risk Mitigation</h3>
      <p>All vehicles will be insured against theft and damage. Regular maintenance will be scheduled to ensure longevity of the assets. Drivers will be thoroughly vetted and will sign contracts with security deposits.</p>
      
      <h3>Management</h3>
      <p>A local manager will oversee the fleet, handle driver relations, and ensure proper maintenance of the vehicles. The manager will receive 10% of profits as compensation.</p>
    `,
    creator: "Ibrahim Kamara",
    creatorAvatar: "/images/sierra-leone-coast.jpeg",
    creatorBio:
      "Ibrahim has 5 years of experience managing transportation businesses in Freetown. He previously operated a successful motorcycle taxi business.",
    target: 12000,
    raised: 9600,
    investors: 48,
    category: "Transportation",
    monthlyReturn: "15%",
    timeLeft: "3 days",
    status: "active",
    location: "Freetown, Sierra Leone",
    createdAt: "2023-04-01",
    updates: [
      {
        date: "2023-04-15",
        title: "50% Funding Reached!",
        content: "We've reached 50% of our funding goal! Thank you to all investors who have joined so far.",
      },
      {
        date: "2023-04-08",
        title: "Driver Selection Process",
        content:
          "We've started interviewing potential drivers for the taxi fleet. Looking for experienced drivers with clean records.",
      },
    ],
    comments: [
      {
        user: "Sarah Johnson",
        avatar: "/images/sierra-leone-coast.jpeg",
        date: "2023-04-14",
        content: "This looks like a great opportunity! What's the expected lifespan of the vehicles?",
      },
      {
        user: "Michael Chen",
        avatar: "/images/sierra-leone-coast.jpeg",
        date: "2023-04-12",
        content: "I've invested in similar projects in Kenya. The returns are usually consistent if managed well.",
      },
    ],
    quadraticVoting: {
      status: "pending", 
      threshold: 80,
      endDate: "2023-04-25",
      votes: {
        yes: 32,
        no: 5,
      },
    },
  }

  // Calculate funding percentage
  const fundingPercentage = (pool.raised / pool.target) * 100

  // Check if quadratic voting should be active
  const isVotingActive =
    fundingPercentage >= pool.quadraticVoting.threshold && pool.quadraticVoting.status === "pending"

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link
          href="/explore"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Explore
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="p-0">
              <div className="h-64 bg-gray-100 dark:bg-gray-800 sm:h-80">
                <img
                  src="/images/sierra-leone-coast.jpeg"
                  alt="Sierra Leone Coast Project"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Rest of your component */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="outline">{pool.category}</Badge>
                <Badge variant="secondary">{pool.monthlyReturn} Monthly Return</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" />
                  {pool.location}
                </div>
              </div>
              <CardTitle className="mb-2 text-2xl">{pool.title}</CardTitle>
              <CardDescription className="mb-6">{pool.description}</CardDescription>
              
              {/* Investment form and other UI elements */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Investment Amount</label>
                  <input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="Enter amount"
                  />
                </div>
                <Button onClick={() => console.log("Invest clicked")}>
                  Invest Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
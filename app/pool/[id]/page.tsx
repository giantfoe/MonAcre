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

interface PageProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function PoolDetailPage({ params }: PageProps) {
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
    creatorAvatar: "/placeholder.svg?height=40&width=40",
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
        avatar: "/placeholder.svg?height=40&width=40",
        date: "2023-04-14",
        content: "This looks like a great opportunity! What's the expected lifespan of the vehicles?",
      },
      {
        user: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "2023-04-12",
        content: "I've invested in similar projects in Kenya. The returns are usually consistent if managed well.",
      },
    ],
    quadraticVoting: {
      status: "pending", // pending, active, completed
      threshold: 80, // percentage of funding needed to trigger voting
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
                {/* Placeholder for project image */}
                <div className="flex h-full items-center justify-center">
                  <span className="text-gray-400">Project Image</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
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

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="voting">Voting</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-6">
                  <div
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: pool.longDescription }}
                  />
                </TabsContent>
                <TabsContent value="updates" className="pt-6">
                  <div className="space-y-6">
                    {pool.updates.map((update, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-semibold">{update.title}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1 h-4 w-4" />
                            {update.date}
                          </div>
                        </div>
                        <p>{update.content}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="comments" className="pt-6">
                  <div className="space-y-6">
                    {pool.comments.map((comment, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{comment.user}</p>
                            <p className="text-xs text-gray-500">{comment.date}</p>
                          </div>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-semibold">Add a Comment</h3>
                      <textarea
                        className="mb-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
                        rows={3}
                        placeholder="Write your comment here..."
                      ></textarea>
                      <Button>Post Comment</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="voting" className="pt-6">
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-semibold">Quadratic Voting</h3>
                      <p className="mb-4">
                        When a pool reaches 80% of its funding goal, investors can vote on whether to proceed with the
                        asset purchase. Voting power equals the square root of your investment amount.
                      </p>

                      {isVotingActive ? (
                        <div className="space-y-4">
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Voting is now active!</AlertTitle>
                            <AlertDescription>
                              This pool has reached {Math.round(fundingPercentage)}% of its funding goal. Cast your vote
                              on whether to proceed with the purchase.
                            </AlertDescription>
                          </Alert>
                          <div className="flex gap-4">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700">
                              Vote Yes ({pool.quadraticVoting.votes.yes})
                            </Button>
                            <Button className="flex-1" variant="outline">
                              Vote No ({pool.quadraticVoting.votes.no})
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">Voting ends on {pool.quadraticVoting.endDate}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-500">
                            {fundingPercentage < pool.quadraticVoting.threshold
                              ? `Voting will begin once the pool reaches ${pool.quadraticVoting.threshold}% of its funding goal.`
                              : "Voting has ended."}
                          </p>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="rounded-lg border p-3 text-center">
                              <p className="text-lg font-bold text-green-600">{pool.quadraticVoting.votes.yes}</p>
                              <p className="text-sm">Yes Votes</p>
                            </div>
                            <div className="rounded-lg border p-3 text-center">
                              <p className="text-lg font-bold text-red-600">{pool.quadraticVoting.votes.no}</p>
                              <p className="text-sm">No Votes</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold">Funding Progress</h3>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Raised: ${pool.raised.toLocaleString()}</span>
                  <span>{Math.round(fundingPercentage)}%</span>
                </div>
                <Progress value={fundingPercentage} className="h-2" />
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span>Goal: ${pool.target.toLocaleString()}</span>
                  <span className="flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    {pool.investors} investors
                  </span>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3 text-center">
                  <div className="flex items-center justify-center text-lg font-bold text-green-600">
                    <Clock className="mr-1 h-4 w-4" />
                    {pool.timeLeft}
                  </div>
                  <p className="text-sm">Time Left</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <div className="flex items-center justify-center text-lg font-bold text-green-600">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {pool.monthlyReturn}
                  </div>
                  <p className="text-sm">Monthly Return</p>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Invest Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Invest in {pool.title}</DialogTitle>
                    <DialogDescription>Enter the amount you want to invest in this pool.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="investment-amount">Investment Amount (USD)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input
                          id="investment-amount"
                          placeholder="Enter amount"
                          className="pl-10"
                          type="number"
                          value={investAmount}
                          onChange={(e) => setInvestAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="mb-2 text-sm font-medium">Investment Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Investment Amount:</span>
                          <span>${investAmount || "0"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Fee (2%):</span>
                          <span>${investAmount ? (Number.parseFloat(investAmount) * 0.02).toFixed(2) : "0"}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>${investAmount ? (Number.parseFloat(investAmount) * 1.02).toFixed(2) : "0"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-900">
                      <h4 className="mb-2 text-sm font-medium">Estimated Returns</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Return ({pool.monthlyReturn}):</span>
                          <span>${investAmount ? (Number.parseFloat(investAmount) * 0.15).toFixed(2) : "0"}/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Return:</span>
                          <span>
                            ${investAmount ? (Number.parseFloat(investAmount) * 0.15 * 12).toFixed(2) : "0"}/year
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" className="sm:mr-2">
                      Cancel
                    </Button>
                    <Button type="button" className="bg-green-600 hover:bg-green-700">
                      Confirm Investment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="mt-4 flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="flex-1">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share this pool</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="flex-1">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Like this pool</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="flex-1">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View documents</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About the Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={pool.creatorAvatar || "/placeholder.svg"} alt={pool.creator} />
                  <AvatarFallback>{pool.creator.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{pool.creator}</p>
                  <p className="text-sm text-gray-500">Project Creator</p>
                </div>
              </div>
              <p className="mt-4 text-sm">{pool.creatorBio}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm">
                  <p>Member since: {pool.createdAt}</p>
                  <p>Projects: 3</p>
                </div>
                <Button variant="outline" size="sm">
                  View Profile <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800"></div>
                <div className="flex-1">
                  <p className="font-medium">Motorcycle Delivery Service</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">16% Monthly Return</p>
                    <Badge>Funded</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800"></div>
                <div className="flex-1">
                  <p className="font-medium">Minibus Transport Line</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">18% Monthly Return</p>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800"></div>
                <div className="flex-1">
                  <p className="font-medium">Truck Logistics Service</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">20% Monthly Return</p>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }] // Example static paths
}

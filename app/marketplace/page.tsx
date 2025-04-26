"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowUpDown, Search, TrendingUp } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price")

  // Mock data for marketplace listings
  const listings = [
    {
      id: "1",
      title: "Taxi Fleet in Freetown",
      tokenPrice: 1.25,
      originalPrice: 1.0,
      change: "+25%",
      monthlyReturn: "15%",
      seller: "Ibrahim Kamara",
      sellerAvatar: "/placeholder.svg?height=40&width=40",
      tokensAvailable: 800,
      category: "Transportation",
      status: "active",
    },
    {
      id: "2",
      title: "Community Market Stalls",
      tokenPrice: 1.12,
      originalPrice: 1.0,
      change: "+12%",
      monthlyReturn: "12%",
      seller: "Aminata Sesay",
      sellerAvatar: "/placeholder.svg?height=40&width=40",
      tokensAvailable: 500,
      category: "Retail",
      status: "active",
    },
    {
      id: "3",
      title: "Motorcycle Delivery Service",
      tokenPrice: 1.35,
      originalPrice: 1.0,
      change: "+35%",
      monthlyReturn: "16%",
      seller: "Mohamed Conteh",
      sellerAvatar: "/placeholder.svg?height=40&width=40",
      tokensAvailable: 300,
      category: "Transportation",
      status: "active",
    },
    {
      id: "4",
      title: "Poultry Farm Expansion",
      tokenPrice: 1.45,
      originalPrice: 1.0,
      change: "+45%",
      monthlyReturn: "22%",
      seller: "Isatu Turay",
      sellerAvatar: "/placeholder.svg?height=40&width=40",
      tokensAvailable: 200,
      category: "Agriculture",
      status: "active",
    },
    {
      id: "5",
      title: "Solar-Powered Internet Café",
      tokenPrice: 1.18,
      originalPrice: 1.0,
      change: "+18%",
      monthlyReturn: "18%",
      seller: "Abdul Kargbo",
      sellerAvatar: "/placeholder.svg?height=40&width=40",
      tokensAvailable: 650,
      category: "Technology",
      status: "active",
    },
    {
      id: "6",
      title: "Fishing Boat Collective",
      tokenPrice: 1.3,
      originalPrice: 1.0,
      change: "+30%",
      monthlyReturn: "20%",
      seller: "Fatmata Koroma",
      sellerAvatar: "/placeholder.svg?height=40&width=40",
      tokensAvailable: 400,
      category: "Fishing",
      status: "active",
    },
  ]

  // Filter listings based on search term
  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort listings based on sortBy
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === "price") {
      return b.tokenPrice - a.tokenPrice
    } else if (sortBy === "return") {
      return Number.parseFloat(b.monthlyReturn) - Number.parseFloat(a.monthlyReturn)
    } else if (sortBy === "available") {
      return b.tokensAvailable - a.tokensAvailable
    }
    return 0
  })

  // Mock data for trending assets
  const trendingAssets = [
    {
      id: "1",
      title: "Poultry Farm Expansion",
      change: "+45%",
      volume: 12500,
    },
    {
      id: "4",
      title: "Motorcycle Delivery Service",
      change: "+35%",
      volume: 9800,
    },
    {
      id: "6",
      title: "Fishing Boat Collective",
      change: "+30%",
      volume: 7500,
    },
  ]

  // Mock data for watchlist
  const watchlist = [
    {
      id: "1",
      title: "Taxi Fleet in Freetown",
      tokenPrice: 1.25,
      change: "+25%",
      monthlyReturn: "15%",
      category: "Transportation",
    },
    {
      id: "3",
      title: "Motorcycle Delivery Service",
      tokenPrice: 1.35,
      change: "+35%",
      monthlyReturn: "16%",
      category: "Transportation",
    },
    {
      id: "4",
      title: "Poultry Farm Expansion",
      tokenPrice: 1.45,
      change: "+45%",
      monthlyReturn: "22%",
      category: "Agriculture",
    },
  ]

  return (
    <div className="container py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-gray-500 dark:text-gray-400">Buy and sell ownership tokens for income-generating assets.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search marketplace..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (High to Low)</SelectItem>
                  <SelectItem value="return">Monthly Return</SelectItem>
                  <SelectItem value="available">Tokens Available</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Transportation</DropdownMenuItem>
                  <DropdownMenuItem>Retail</DropdownMenuItem>
                  <DropdownMenuItem>Agriculture</DropdownMenuItem>
                  <DropdownMenuItem>Technology</DropdownMenuItem>
                  <DropdownMenuItem>Fishing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="grid">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
              <p className="text-sm text-gray-500">
                Showing {sortedListings.length} of {listings.length} listings
              </p>
            </div>
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="h-40 bg-gray-100 dark:bg-gray-800">
                        {/* Placeholder for asset image */}
                        <div className="flex h-full items-center justify-center">
                          <span className="text-gray-400">Asset Image</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="mb-2">
                          {listing.category}
                        </Badge>
                        <Badge variant="secondary" className="mb-2">
                          {listing.monthlyReturn} Monthly Return
                        </Badge>
                      </div>
                      <CardTitle className="mb-2 line-clamp-1">{listing.title}</CardTitle>
                      <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Token Price</p>
                          <p className="font-bold">${listing.tokenPrice.toFixed(2)}</p>
                          <p className="text-xs text-green-600">{listing.change}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Available</p>
                          <p className="font-bold">{listing.tokensAvailable.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">tokens</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={listing.sellerAvatar || "/placeholder.svg"} alt={listing.seller} />
                          <AvatarFallback>{listing.seller.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{listing.seller}</p>
                          <p className="text-xs text-gray-500">Seller</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t bg-gray-50 p-4 dark:bg-gray-900">
                      <Link href={`/marketplace/${listing.id}`}>
                        <Button size="sm">
                          Buy Tokens <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="table" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Token Price</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Monthly Return</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedListings.map((listing) => (
                        <TableRow key={listing.id}>
                          <TableCell className="font-medium">{listing.title}</TableCell>
                          <TableCell>{listing.category}</TableCell>
                          <TableCell>${listing.tokenPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-green-600">{listing.change}</TableCell>
                          <TableCell>{listing.monthlyReturn}</TableCell>
                          <TableCell>{listing.tokensAvailable.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={listing.sellerAvatar || "/placeholder.svg"} alt={listing.seller} />
                                <AvatarFallback>{listing.seller.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{listing.seller}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/marketplace/${listing.id}`}>
                              <Button size="sm">Buy</Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Watchlist</CardTitle>
              <CardDescription>Assets you're monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {watchlist.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{asset.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{asset.category}</Badge>
                      <span className="text-xs text-gray-500">{asset.monthlyReturn}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${asset.tokenPrice.toFixed(2)}</p>
                    <p className="text-xs text-green-600">{asset.change}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trending Assets</CardTitle>
              <CardDescription>Most active in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingAssets.map((asset, index) => (
                <div key={asset.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold dark:bg-gray-800">
                      {index + 1}
                    </div>
                    <p className="font-medium">{asset.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">{asset.change}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sell Your Tokens</CardTitle>
              <CardDescription>List your tokens on the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                You can sell tokens from your active investments to other users on the marketplace.
              </p>
              <Link href="/marketplace/sell">
                <Button className="w-full">List Tokens for Sale</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, BarChart3, ChevronDown, DollarSign, Download, LineChart, PieChart, Plus, Share2 } from "lucide-react"
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

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState("month")

  // Mock data for investments
  const investments = [
    {
      id: "1",
      title: "Taxi Fleet in Freetown",
      amount: 1000,
      date: "2023-04-01",
      status: "active",
      monthlyReturn: "15%",
      totalReturn: 150,
      category: "Transportation",
      progress: 80,
    },
    {
      id: "2",
      title: "Community Market Stalls",
      amount: 500,
      date: "2023-03-15",
      status: "active",
      monthlyReturn: "12%",
      totalReturn: 90,
      category: "Retail",
      progress: 90,
    },
    {
      id: "3",
      title: "Motorcycle Delivery Service",
      amount: 750,
      date: "2023-02-20",
      status: "funded",
      monthlyReturn: "16%",
      totalReturn: 240,
      category: "Transportation",
      progress: 100,
    },
  ]

  // Mock data for transactions
  const transactions = [
    {
      id: "1",
      type: "investment",
      amount: 1000,
      date: "2023-04-01",
      project: "Taxi Fleet in Freetown",
      status: "completed",
    },
    {
      id: "2",
      type: "return",
      amount: 150,
      date: "2023-04-30",
      project: "Taxi Fleet in Freetown",
      status: "completed",
    },
    {
      id: "3",
      type: "investment",
      amount: 500,
      date: "2023-03-15",
      project: "Community Market Stalls",
      status: "completed",
    },
    {
      id: "4",
      type: "return",
      amount: 60,
      date: "2023-03-31",
      project: "Community Market Stalls",
      status: "completed",
    },
    {
      id: "5",
      type: "return",
      amount: 60,
      date: "2023-04-30",
      project: "Community Market Stalls",
      status: "completed",
    },
    {
      id: "6",
      type: "investment",
      amount: 750,
      date: "2023-02-20",
      project: "Motorcycle Delivery Service",
      status: "completed",
    },
    {
      id: "7",
      type: "return",
      amount: 120,
      date: "2023-03-20",
      project: "Motorcycle Delivery Service",
      status: "completed",
    },
    {
      id: "8",
      type: "return",
      amount: 120,
      date: "2023-04-20",
      project: "Motorcycle Delivery Service",
      status: "completed",
    },
  ]

  // Calculate total investment and returns
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalReturns = investments.reduce((sum, inv) => sum + inv.totalReturn, 0)

  // Calculate monthly returns based on timeframe
  const monthlyReturns = timeframe === "month" ? totalReturns : totalReturns * 3

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your investments and track your returns.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/create-pool">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Pool
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export for Tax Purposes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Across {investments.length} projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            <BarChart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalReturns.toLocaleString()}</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-500">+{Math.round((totalReturns / totalInvested) * 100)}%</span> return on
              investment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Monthly Returns</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTimeframe("month")}>Last Month</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeframe("quarter")}>Last Quarter</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <LineChart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyReturns.toLocaleString()}</div>
            <p className="text-xs text-gray-500">{timeframe === "month" ? "Last 30 days" : "Last 90 days"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <PieChart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investments.filter((inv) => inv.status === "active").length}</div>
            <p className="text-xs text-gray-500">Out of {investments.length} total investments</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="investments">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="investments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>View and manage your current investments.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {investments.map((investment) => (
                    <div key={investment.id} className="rounded-lg border p-4">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{investment.title}</h3>
                            <Badge variant={investment.status === "active" ? "outline" : "secondary"}>
                              {investment.status === "active" ? "Active" : "Funded"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Invested: ${investment.amount}</span>
                            <span>Returns: ${investment.totalReturn}</span>
                            <span>ROI: {Math.round((investment.totalReturn / investment.amount) * 100)}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/pool/${investment.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Share on X</DropdownMenuItem>
                              <DropdownMenuItem>Copy Link</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{investment.progress}%</span>
                        </div>
                        <Progress value={investment.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Export Data</Button>
                <Link href="/explore">
                  <Button>Find More Projects</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View your investment and return transactions.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant={transaction.type === "investment" ? "outline" : "secondary"}>
                            {transaction.type === "investment" ? "Investment" : "Return"}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.project}</TableCell>
                        <TableCell className="text-right">
                          <span className={transaction.type === "return" ? "text-green-600" : ""}>
                            {transaction.type === "return" ? "+" : "-"}${transaction.amount}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-400"
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Transaction History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Analytics</CardTitle>
                <CardDescription>Visualize your investment performance over time.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-semibold">Returns by Category</h3>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800">
                    <div className="flex h-full items-center justify-center">
                      <div className="flex items-center">
                        <BarChart3 className="mr-2 h-6 w-6 text-gray-400" />
                        <span className="text-gray-400">Chart Placeholder</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-semibold">Monthly Returns</h3>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800">
                    <div className="flex h-full items-center justify-center">
                      <div className="flex items-center">
                        <LineChart className="mr-2 h-6 w-6 text-gray-400" />
                        <span className="text-gray-400">Chart Placeholder</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-semibold">Investment Distribution</h3>
                    <div className="h-48 bg-gray-100 dark:bg-gray-800">
                      <div className="flex h-full items-center justify-center">
                        <div className="flex items-center">
                          <PieChart className="mr-2 h-6 w-6 text-gray-400" />
                          <span className="text-gray-400">Chart Placeholder</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-semibold">ROI Comparison</h3>
                    <div className="h-48 bg-gray-100 dark:bg-gray-800">
                      <div className="flex h-full items-center justify-center">
                        <div className="flex items-center">
                          <BarChart className="mr-2 h-6 w-6 text-gray-400" />
                          <span className="text-gray-400">Chart Placeholder</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

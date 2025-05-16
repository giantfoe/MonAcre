"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Search, SlidersHorizontal, Users } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [returnRange, setReturnRange] = useState([0])
  const [fundingStatus, setFundingStatus] = useState("all")

  // Mock data for projects
  const projects = [
    {
      id: "1",
      title: "Taxi Fleet in Freetown",
      description:
        "Fund a fleet of 5 taxis operating in Freetown, Sierra Leone. Monthly profits distributed to all investors.",
      creator: "Ibrahim Kamara",
      creatorAvatar: "/images/sierra-leone-coast.jpeg", // Updated
      target: 12000,
      raised: 9600,
      investors: 48,
      category: "Transportation",
      monthlyReturn: "15%",
      timeLeft: "3 days",
      status: "active",
    },
    {
      id: "2",
      title: "Community Market Stalls",
      description:
        "Invest in 10 market stalls in Bo City's central market. Steady income from rent and profit sharing.",
      creator: "Aminata Sesay",
      creatorAvatar: "/images/sierra-leone-coast.jpeg", // Updated
      target: 8000,
      raised: 7200,
      investors: 36,
      category: "Retail",
      monthlyReturn: "12%",
      timeLeft: "5 days",
      status: "active",
    },
    {
      id: "3",
      title: "Solar-Powered Internet Café",
      description: "Fund a solar-powered internet café in Makeni providing digital services to the community.",
      creator: "Mohamed Conteh",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
      target: 15000,
      raised: 10500,
      investors: 62,
      category: "Technology",
      monthlyReturn: "18%",
      timeLeft: "7 days",
      status: "active",
    },
    {
      id: "4",
      title: "Fishing Boat Collective",
      description: "Invest in a fleet of 3 fishing boats operating along the coast of Sierra Leone.",
      creator: "Fatmata Koroma",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
      target: 20000,
      raised: 14000,
      investors: 75,
      category: "Fishing",
      monthlyReturn: "20%",
      timeLeft: "10 days",
      status: "active",
    },
    {
      id: "5",
      title: "Mobile Grain Mill",
      description:
        "Fund a mobile grain mill to serve rural communities in Sierra Leone, reducing processing costs for farmers.",
      creator: "Joseph Bangura",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
      target: 7500,
      raised: 3000,
      investors: 28,
      category: "Agriculture",
      monthlyReturn: "14%",
      timeLeft: "15 days",
      status: "active",
    },
    {
      id: "6",
      title: "Community Water Purification",
      description:
        "Invest in water purification systems for communities lacking clean water access. Subscription-based model.",
      creator: "Mariama Jalloh",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
      target: 25000,
      raised: 5000,
      investors: 42,
      category: "Utilities",
      monthlyReturn: "10%",
      timeLeft: "20 days",
      status: "active",
    },
    {
      id: "7",
      title: "Motorcycle Delivery Service",
      description:
        "Fund a fleet of motorcycles for a delivery service in Freetown, serving businesses and individuals.",
      creator: "Abdul Kargbo",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
      target: 10000,
      raised: 10000,
      investors: 55,
      category: "Transportation",
      monthlyReturn: "16%",
      timeLeft: "0 days",
      status: "funded",
    },
    {
      id: "8",
      title: "Poultry Farm Expansion",
      description: "Help expand an existing poultry farm to meet growing demand for eggs and chicken in Bo City.",
      creator: "Isatu Turay",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
      target: 18000,
      raised: 18000,
      investors: 67,
      category: "Agriculture",
      monthlyReturn: "22%",
      timeLeft: "0 days",
      status: "funded",
    },
  ]

  // Filter projects based on search term, category, and funding status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || project.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesFundingStatus =
      fundingStatus === "all" ||
      (fundingStatus === "active" && project.status === "active") ||
      (fundingStatus === "funded" && project.status === "funded")

    const matchesReturn = Number.parseFloat(project.monthlyReturn) >= returnRange[0]

    return matchesSearch && matchesCategory && matchesFundingStatus && matchesReturn
  })

  return (
    <>
      <div className="container py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Explore Investment Pools</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Discover income-generating assets in Sierra Leone and start investing today.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="fishing">Fishing</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Projects</SheetTitle>
                <SheetDescription>Refine your search with additional filters.</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Funding Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="status-all"
                        checked={fundingStatus === "all"}
                        onCheckedChange={() => setFundingStatus("all")}
                      />
                      <Label htmlFor="status-all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="status-active"
                        checked={fundingStatus === "active"}
                        onCheckedChange={() => setFundingStatus("active")}
                      />
                      <Label htmlFor="status-active">Active Funding</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="status-funded"
                        checked={fundingStatus === "funded"}
                        onCheckedChange={() => setFundingStatus("funded")}
                      />
                      <Label htmlFor="status-funded">Fully Funded</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Minimum Monthly Return</h3>
                    <span className="text-sm font-medium">{returnRange[0]}%</span>
                  </div>
                  <Slider defaultValue={[0]} max={25} step={1} value={returnRange} onValueChange={setReturnRange} />
                </div>
                <Button className="w-full" onClick={() => {}}>
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Tabs defaultValue="grid" className="mb-8">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <p className="text-sm text-gray-500">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
        <TabsContent value="grid" className="mt-6">
          <div className="container max-w-7xl px-4 py-8">


  <h1 className="text-3xl font-bold tracking-tight text-primary mb-8">Investment Opportunities</h1>
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden bg-card/50 hover:bg-card transition-colors border-border">
                <CardHeader className="p-0">
                  <div className="h-48 bg-gray-100 dark:bg-gray-800">
                    {/* Placeholder for project image */}
                    <div className="flex h-full items-center justify-center">
                      <span className="text-gray-400">Project Image</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="mb-2">
                      {project.category}
                    </Badge>
                    <Badge variant="secondary" className="mb-2">
                      {project.monthlyReturn} Monthly Return
                    </Badge>
                  </div>
                  <CardTitle className="mb-2 line-clamp-1">{project.title}</CardTitle>
                  <CardDescription className="mb-4 line-clamp-2">{project.description}</CardDescription>
                  <div className="mb-4">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Raised: ${project.raised.toLocaleString()}</span>
                      <span>{Math.round((project.raised / project.target) * 100)}%</span>
                    </div>
                    <Progress value={(project.raised / project.target) * 100} className="h-2 bg-muted" indicatorClassName="bg-accent" />
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span>Goal: ${project.target.toLocaleString()}</span>
                      <span className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        {project.investors} investors
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.creatorAvatar || "/placeholder.svg"} alt={project.creator} />
                      <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{project.creator}</p>
                      <p className="text-xs text-gray-500">Project Creator</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-gray-50 p-4 dark:bg-gray-900">
                  <span className="text-sm font-medium">
                    {project.status === "funded" ? "Fully Funded" : `${project.timeLeft} left`}
                  </span>
                  <Link href={`/pool/${project.id}`}>
                    <Button asChild variant="default" size="default" className="w-full mt-4">
                      View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <div className="flex flex-col md:flex-row">
                  <div className="h-48 w-full bg-gray-100 dark:bg-gray-800 md:h-auto md:w-1/4">
                    {/* Placeholder for project image */}
                    <div className="flex h-full items-center justify-center">
                      <span className="text-gray-400">Project Image</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline">{project.category}</Badge>
                        <Badge variant="secondary">{project.monthlyReturn} Monthly Return</Badge>
                      </div>
                      <span className="text-sm font-medium">
                        {project.status === "funded" ? "Fully Funded" : `${project.timeLeft} left`}
                      </span>
                    </div>
                    <CardTitle className="mb-2">{project.title}</CardTitle>
                    <CardDescription className="mb-4">{project.description}</CardDescription>
                    <div className="mb-4">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Raised: ${project.raised.toLocaleString()}</span>
                        <span>{Math.round((project.raised / project.target) * 100)}%</span>
                      </div>
                      <Progress value={(project.raised / project.target) * 100} className="h-2 bg-muted" indicatorClassName="bg-accent" />
                      <div className="mt-1 flex items-center justify-between text-sm">
                        <span>Goal: ${project.target.toLocaleString()}</span>
                        <span className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {project.investors} investors
                        </span>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.creatorAvatar || "/placeholder.svg"} alt={project.creator} />
                          <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{project.creator}</p>
                          <p className="text-xs text-gray-500">Project Creator</p>
                        </div>
                      </div>
                      <Link href={`/pool/${project.id}`}>
                        <Button>
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
          </Card>
        ))}
      </div>
    </TabsContent>
  </Tabs>
  </div> {/* Closing tag for <div className=\"container py-12\"> opened at line 167 */}
  </>
);
}

<img
  src="/images/sierra-leone-coast.jpeg"
  alt="Project visual"
  className="w-full h-full object-cover rounded-lg"
/>

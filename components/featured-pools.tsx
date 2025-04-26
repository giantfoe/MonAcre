import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users } from "lucide-react"

export default function FeaturedPools() {
  // Mock data for featured pools
  const featuredPools = [
    {
      id: "1",
      title: "Taxi Fleet in Freetown",
      description:
        "Fund a fleet of 5 taxis operating in Freetown, Sierra Leone. Monthly profits distributed to all investors.",
      creator: "Ibrahim Kamara",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
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
      creatorAvatar: "/placeholder.svg?height=40&width=40",
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
  ]

  return (
    <section className="py-12 bg-white dark:bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Investment Pools</h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
              Discover high-impact investment opportunities in Sierra Leone
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredPools.map((pool) => (
            <Card key={pool.id} className="overflow-hidden">
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
                    {pool.category}
                  </Badge>
                  <Badge variant="secondary" className="mb-2">
                    {pool.monthlyReturn} Monthly Return
                  </Badge>
                </div>
                <CardTitle className="mb-2 line-clamp-1">{pool.title}</CardTitle>
                <CardDescription className="mb-4 line-clamp-2">{pool.description}</CardDescription>
                <div className="mb-4">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Raised: ${pool.raised.toLocaleString()}</span>
                    <span>{Math.round((pool.raised / pool.target) * 100)}%</span>
                  </div>
                  <Progress value={(pool.raised / pool.target) * 100} className="h-2" />
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span>Goal: ${pool.target.toLocaleString()}</span>
                    <span className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {pool.investors} investors
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={pool.creatorAvatar || "/placeholder.svg"} alt={pool.creator} />
                    <AvatarFallback>{pool.creator.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{pool.creator}</p>
                    <p className="text-xs text-gray-500">Project Creator</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t bg-gray-50 p-4 dark:bg-gray-900">
                <span className="text-sm font-medium">{pool.timeLeft} left</span>
                <Link href={`/pool/${pool.id}`}>
                  <Button size="sm">
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center pt-4">
          <Link href="/explore">
            <Button variant="outline" size="lg">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

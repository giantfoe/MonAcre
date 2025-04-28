import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Clock } from "lucide-react"

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
    <section className="py-16 md:py-24 bg-white dark:bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Investment Pools</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-[800px] mx-auto mt-4">
              Discover high-impact investment opportunities in Sierra Leone
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {featuredPools.map((pool) => (
            <Card
              key={pool.id}
              className="overflow-hidden transition-all hover:shadow-elevation-2 border-gray-200 dark:border-gray-800"
            >
              <CardHeader className="p-0">
                <div className="h-48 bg-gray-100 dark:bg-gray-800">
                  {/* Placeholder for project image */}
                  <div className="flex h-full items-center justify-center">
                    <span className="text-gray-400">Project Image</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                  >
                    {pool.category}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                  >
                    {pool.monthlyReturn} Monthly Return
                  </Badge>
                </div>
                <CardTitle className="mb-2 text-xl line-clamp-1">{pool.title}</CardTitle>
                <CardDescription className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                  {pool.description}
                </CardDescription>
                <div className="mb-4">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">Raised: ${pool.raised.toLocaleString()}</span>
                    <span className="font-medium text-purple-600">
                      {Math.round((pool.raised / pool.target) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(pool.raised / pool.target) * 100}
                    className="h-2 bg-gray-100 dark:bg-gray-700"
                    indicatorClassName="bg-purple-600"
                  />
                  <div className="mt-1.5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Goal: ${pool.target.toLocaleString()}</span>
                    <span className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {pool.investors} investors
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                    <AvatarImage src={pool.creatorAvatar || "/placeholder.svg"} alt={pool.creator} />
                    <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      {pool.creator.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{pool.creator}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Project Creator</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t bg-gray-50 p-4 dark:bg-gray-900/50 dark:border-gray-800">
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {pool.timeLeft} left
                </span>
                <Link href={`/pool/${pool.id}`}>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center pt-8">
          <Link href="/explore">
            <Button
              variant="outline"
              size="lg"
              className="relative overflow-hidden group border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/30"
            >
              <span className="relative z-10 flex items-center font-medium">
                View All Projects{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

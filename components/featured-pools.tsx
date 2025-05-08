import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Clock, Layers } from "lucide-react"
import Image from "next/image"

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxNSAwIEwgMCAxNSBNIDMwIDE1IEwgMTUgMzAgTSA0NSAzMCBMIDMwIDQ1IE0gNjAgNDUgTCA0NSA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-2">
              <Layers className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
              <span>Trending Opportunities</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Featured Investment Pools
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-[800px] mx-auto mt-4">
              Discover high-impact investment opportunities in Sierra Leone
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {featuredPools.map((pool) => (
            <Card
              key={pool.id}
              className="overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-500/20 border-white/10 bg-white/5 backdrop-blur-sm rounded-xl group"
            >
              <CardHeader className="p-0">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/sierra-leone-coast.jpeg"
                    alt={pool.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                  {/* Futuristic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
                        {pool.category}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0"
                      >
                        {pool.monthlyReturn} Monthly Return
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 text-xl line-clamp-1 text-white">{pool.title}</CardTitle>
                <CardDescription className="mb-4 line-clamp-2 text-gray-300">{pool.description}</CardDescription>
                <div className="mb-4">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-white">Raised: ${pool.raised.toLocaleString()}</span>
                    <span className="font-medium text-purple-400">
                      {Math.round((pool.raised / pool.target) * 100)}%
                    </span>
                  </div>
                  <div className="relative h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                      style={{ width: `${Math.round((pool.raised / pool.target) * 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm text-gray-400">
                    <span>Goal: ${pool.target.toLocaleString()}</span>
                    <span className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {pool.investors} investors
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 border border-white/20 bg-black/50">
                    <AvatarImage src={pool.creatorAvatar || "/placeholder.svg"} alt={pool.creator} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
                      {pool.creator.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium text-white">{pool.creator}</p>
                    <p className="text-xs text-gray-400">Project Creator</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-white/10 bg-black/30 p-4">
                <span className="text-sm font-medium text-amber-400 flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {pool.timeLeft} left
                </span>
                <Link href={`/pool/${pool.id}`}>
                  <Button
                    size="sm"
                    className="gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700 relative overflow-hidden group" // Applied Connect Wallet style
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center">
                      View Details{" "}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center pt-8">
          <Link href="/explore">
            <Button
              size="lg"
              className="gap-2 bg-black hover:bg-gray-800 text-white border border-gray-700 relative overflow-hidden group backdrop-blur-sm" // Applied Connect Wallet style, kept backdrop-blur-sm
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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

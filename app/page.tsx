import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart3, Globe, Shield, Users } from "lucide-react"
import FeaturedPools from "@/components/featured-pools"
import HowItWorks from "@/components/how-it-works"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-20 dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Democratizing Access to Income-Generating Assets
                </h1>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Enable fractional ownership of assets in emerging markets through blockchain technology. Pool
                  resources, share profits, and make decisions together.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/create-pool">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Create a Pool <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline">
                    Explore Projects
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Fractional ownership illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
              <h3 className="text-3xl font-bold">$2.4M+</h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">Total Funded</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
              <h3 className="text-3xl font-bold">124+</h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">Projects Funded</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
              <h3 className="text-3xl font-bold">5,400+</h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">Global Investors</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
              <h3 className="text-3xl font-bold">18%</h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">Avg. Monthly Return</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                Our platform provides unique tools to democratize investment in emerging markets
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Fractional Ownership</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Pool resources with others to acquire income-generating assets that would be otherwise unaffordable.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Transparent Profit Distribution</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Smart contracts automatically distribute profits to all investors based on their ownership percentage.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Quadratic Voting</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Democratic decision-making where voting power equals the square root of investment amount.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Secure Blockchain Technology</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Built on Solana for fast, low-fee transactions with multi-signature security and smart contract
                  audits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pools */}
      <FeaturedPools />

      {/* How It Works */}
      <HowItWorks />

      {/* CTA Section */}
      <section className="py-12 bg-green-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-green-100 md:text-xl/relaxed">
                Join our community of investors and project creators making a difference in emerging markets.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/create-pool">
                <Button size="lg" variant="secondary">
                  Create a Pool
                </Button>
              </Link>
              <Link href="/explore">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-green-700"
                >
                  Explore Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

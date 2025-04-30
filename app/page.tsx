import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart3, Globe, Shield, Users, Zap, Layers, Cpu } from "lucide-react"
import FeaturedPools from "@/components/featured-pools"
import HowItWorks from "@/components/how-it-works"
import Image from "next/image"
import PrivySignupButton from '@/components/privy-signup-button';
import SecondComponent from '@/components/second-component';
import ClientComponent from '@/components/client-component';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sierra-leone-coast.jpeg"
            alt="Coastal scene in Sierra Leone"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-indigo-900/40 to-transparent"></div>

          {/* Futuristic overlay elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-[10%] left-[5%] w-[30%] h-[1px] bg-gradient-to-r from-purple-500 to-transparent"></div>
              <div className="absolute top-[20%] left-[15%] w-[40%] h-[1px] bg-gradient-to-r from-blue-500 to-transparent"></div>
              <div className="absolute top-[30%] left-[10%] w-[25%] h-[1px] bg-gradient-to-r from-indigo-500 to-transparent"></div>
              <div className="absolute top-[40%] left-[20%] w-[35%] h-[1px] bg-gradient-to-r from-violet-500 to-transparent"></div>
              <div className="absolute top-[50%] left-[5%] w-[45%] h-[1px] bg-gradient-to-r from-purple-500 to-transparent"></div>
              <div className="absolute top-[60%] left-[15%] w-[30%] h-[1px] bg-gradient-to-r from-blue-500 to-transparent"></div>
              <div className="absolute top-[70%] left-[10%] w-[40%] h-[1px] bg-gradient-to-r from-indigo-500 to-transparent"></div>
              <div className="absolute top-[80%] left-[20%] w-[25%] h-[1px] bg-gradient-to-r from-violet-500 to-transparent"></div>
              <div className="absolute top-[90%] left-[5%] w-[35%] h-[1px] bg-gradient-to-r from-purple-500 to-transparent"></div>
            </div>

            {/* Digital grid overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
          </div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-2">
                  <Zap className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
                  <span>Blockchain-Powered Investment Platform</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-white leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                    Democratizing Access to Income-Generating Assets
                  </span>
                </h1>
                <p className="max-w-[600px] text-white/90 text-lg md:text-xl leading-relaxed">
                  Enable fractional ownership of assets in emerging markets through blockchain technology. Pool
                  resources, share profits, and make decisions together.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/create-pool">
                  <Button
                    size="lg"
                    className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-purple-900/30"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/40 to-indigo-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center">
                      Create a Pool{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    Explore Projects
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] backdrop-blur-md rounded-2xl p-6 animate-float">
                {/* Hexagonal frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

                  {/* Animated hexagon pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern
                          id="hexagons"
                          width="50"
                          height="43.4"
                          patternUnits="userSpaceOnUse"
                          patternTransform="scale(2) rotate(0)"
                        >
                          <path
                            d="M25 0 L50 14.4 L50 38.6 L25 53 L0 38.6 L0 14.4 Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hexagons)" />
                    </svg>
                  </div>

                  {/* Glowing edges */}
                  <div className="absolute inset-0 rounded-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                    <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
                  </div>
                </div>

                <div className="relative h-full w-full flex flex-col justify-center z-10">
                  <h3 className="text-white text-2xl font-bold mb-4 flex items-center">
                    <Cpu className="h-5 w-5 mr-2 text-purple-400" />
                    Invest in Sierra Leone
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Community-Driven</p>
                        <p className="text-white/70 text-sm">Pooled resources for greater impact</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Transparent Returns</p>
                        <p className="text-white/70 text-sm">Average 15-20% monthly returns</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/30">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Blockchain Secured</p>
                        <p className="text-white/70 text-sm">Built on Solana for security & speed</p>
                      </div>
                    </div>
                  </div>

                  {/* Animated data visualization */}
                  <div className="absolute bottom-6 right-6 h-20 w-40">
                    <div className="relative h-full w-full">
                      <div className="absolute bottom-0 left-0 w-[10%] h-[30%] bg-purple-500/70 animate-pulse"></div>
                      <div className="absolute bottom-0 left-[12%] w-[10%] h-[50%] bg-indigo-500/70 animate-pulse delay-100"></div>
                      <div className="absolute bottom-0 left-[24%] w-[10%] h-[70%] bg-purple-500/70 animate-pulse delay-200"></div>
                      <div className="absolute bottom-0 left-[36%] w-[10%] h-[40%] bg-indigo-500/70 animate-pulse delay-300"></div>
                      <div className="absolute bottom-0 left-[48%] w-[10%] h-[80%] bg-purple-500/70 animate-pulse delay-400"></div>
                      <div className="absolute bottom-0 left-[60%] w-[10%] h-[60%] bg-indigo-500/70 animate-pulse delay-500"></div>
                      <div className="absolute bottom-0 left-[72%] w-[10%] h-[90%] bg-purple-500/70 animate-pulse delay-600"></div>
                      <div className="absolute bottom-0 left-[84%] w-[10%] h-[75%] bg-indigo-500/70 animate-pulse delay-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white border-y border-white/10">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-2 p-6 text-center backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                $2.4M+
              </h3>
              <p className="text-center text-sm font-medium text-gray-300">Total Funded</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 p-6 text-center backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                124+
              </h3>
              <p className="text-center text-sm font-medium text-gray-300">Projects Funded</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 p-6 text-center backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                5,400+
              </h3>
              <p className="text-center text-sm font-medium text-gray-300">Global Investors</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 p-6 text-center backdrop-blur-sm bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                18%
              </h3>
              <p className="text-center text-sm font-medium text-gray-300">Avg. Monthly Return</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjAuNSIvPjxwYXRoIGQ9Ik0gMzAgMCBMIDAgMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNIDYwIDMwIEwgMzAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-2">
                <Layers className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
                <span>Cutting-Edge Technology</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                Key Features
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-[800px] mx-auto mt-4">
                Our platform provides unique tools to democratize investment in emerging markets
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col items-start space-y-4 rounded-xl border border-white/10 p-6 transition-all hover:shadow-lg hover:shadow-purple-500/10 bg-white/5 backdrop-blur-sm group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-900/30 group-hover:shadow-purple-900/50 transition-all">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Fractional Ownership</h3>
                <p className="text-gray-300">
                  Pool resources with others to acquire income-generating assets that would be otherwise unaffordable.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4 rounded-xl border border-white/10 p-6 transition-all hover:shadow-lg hover:shadow-purple-500/10 bg-white/5 backdrop-blur-sm group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-900/30 group-hover:shadow-purple-900/50 transition-all">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Transparent Profit Distribution</h3>
                <p className="text-gray-300">
                  Smart contracts automatically distribute profits to all investors based on their ownership percentage.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4 rounded-xl border border-white/10 p-6 transition-all hover:shadow-lg hover:shadow-purple-500/10 bg-white/5 backdrop-blur-sm group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-900/30 group-hover:shadow-purple-900/50 transition-all">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Quadratic Voting</h3>
                <p className="text-gray-300">
                  Democratic decision-making where voting power equals the square root of investment amount.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4 rounded-xl border border-white/10 p-6 transition-all hover:shadow-lg hover:shadow-purple-500/10 bg-white/5 backdrop-blur-sm group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-900/30 group-hover:shadow-purple-900/50 transition-all">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Secure Blockchain Technology</h3>
                <p className="text-gray-300">
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
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sierra-leone-coast.jpeg"
            alt="Coastal scene in Sierra Leone"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-indigo-900/40 to-transparent"></div>

          {/* Futuristic overlay elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-[10%] right-[5%] w-[30%] h-[1px] bg-gradient-to-l from-purple-500 to-transparent"></div>
              <div className="absolute top-[20%] right-[15%] w-[40%] h-[1px] bg-gradient-to-l from-blue-500 to-transparent"></div>
              <div className="absolute top-[30%] right-[10%] w-[25%] h-[1px] bg-gradient-to-l from-indigo-500 to-transparent"></div>
              <div className="absolute top-[40%] right-[20%] w-[35%] h-[1px] bg-gradient-to-l from-violet-500 to-transparent"></div>
              <div className="absolute top-[50%] right-[5%] w-[45%] h-[1px] bg-gradient-to-l from-purple-500 to-transparent"></div>
              <div className="absolute top-[60%] right-[15%] w-[30%] h-[1px] bg-gradient-to-l from-blue-500 to-transparent"></div>
              <div className="absolute top-[70%] right-[10%] w-[40%] h-[1px] bg-gradient-to-l from-indigo-500 to-transparent"></div>
              <div className="absolute top-[80%] right-[20%] w-[25%] h-[1px] bg-gradient-to-l from-violet-500 to-transparent"></div>
              <div className="absolute top-[90%] right-[5%] w-[35%] h-[1px] bg-gradient-to-l from-purple-500 to-transparent"></div>
            </div>
          </div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-2">
                <Zap className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
                <span>Join the Future of Investment</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                Ready to Get Started?
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                Join our community of investors and project creators making a difference in emerging markets.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Link href="/create-pool">
                <Button
                  size="lg"
                  className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-purple-900/30"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/40 to-indigo-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    Create a Pool <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link href="/explore">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
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

// And at line 1338, change:
function HomePage() {
  return (
    <>
      {/* Content from first component */}
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            MonAcre
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl">
            Tokenize and trade real-world assets on the blockchain with transparency and security.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <PrivySignupButton 
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium"
              size="lg"
            />
            <a href="/learn" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Content from second component */}
      <div className="section-two">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            MonAcre
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl">
            Tokenize and trade real-world assets on the blockchain with transparency and security.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <PrivySignupButton 
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium"
              size="lg"
            />
            <a href="/learn" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Use the second component */}
      <SecondComponent />
    </>
  );
}

{/* Client component */}
<ClientComponent />

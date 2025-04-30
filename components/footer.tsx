import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Zap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white border-t border-white/10">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center">
              <Zap className="h-5 w-5 mr-2 text-purple-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                MonAcre
              </span>
            </h3>
            <p className="max-w-xs text-gray-300">
              Democratizing access to income-generating assets in emerging markets through blockchain technology.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-full"
              >
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-full"
              >
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-gray-400 hover:text-purple-400 hover:bg-white/5 rounded-full"
              >
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/explore" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link href="/create-pool" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Create a Pool
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/learn" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Subscribe</h3>
            <p className="text-gray-300">Stay updated with the latest projects and platform news.</p>
            <form className="flex space-x-2">
              <Input
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter your email"
                type="email"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} SolFund. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-purple-400 transition-colors">
                Cookies Policy
              </Link>
              <img 
                src="/images/monacre logo.png" 
                alt="MonAcre Logo"
                className="h-6 w-6 mr-2"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

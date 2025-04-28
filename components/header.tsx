"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import WalletConnect from "./wallet-connect"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Menu"
                className="mr-2 text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-gray-900 border-white/10 text-white">
              <nav className="flex flex-col gap-6">
                <Link href="/" className="text-xl font-bold flex items-center" onClick={() => setIsOpen(false)}>
                  <Zap className="h-5 w-5 mr-2 text-purple-400" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    SolFund
                  </span>
                </Link>
                <div className="space-y-3">
                  <Link
                    href="/explore"
                    className="block text-base py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Explore
                  </Link>
                  <Link
                    href="/create-pool"
                    className="block text-base py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Pool
                  </Link>
                  <Link
                    href="/marketplace"
                    className="block text-base py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Marketplace
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block text-base py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/learn"
                    className="block text-base py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Learn
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold flex items-center">
              <Zap className="h-5 w-5 mr-2 text-purple-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                SolFund
              </span>
            </span>
          </Link>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link href="/explore" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white bg-transparent hover:bg-white/10 hover:text-white",
                  )}
                >
                  Explore
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/create-pool" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white bg-transparent hover:bg-white/10 hover:text-white",
                  )}
                >
                  Create Pool
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10 hover:text-white">
                Marketplace
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-gray-900 border-white/10 rounded-xl">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-purple-600 to-indigo-600 p-6 no-underline outline-none focus:shadow-md overflow-hidden group"
                        href="/marketplace"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="mt-4 mb-2 text-lg font-medium text-white relative z-10">Marketplace</div>
                        <p className="text-sm leading-tight text-white/90 relative z-10">
                          Trade ownership tokens based on past performance with transparent historical data.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/marketplace/buy" title="Buy Shares">
                    Purchase shares in existing income-generating assets
                  </ListItem>
                  <ListItem href="/marketplace/sell" title="Sell Shares">
                    List your shares for sale on the marketplace
                  </ListItem>
                  <ListItem href="/marketplace/watchlist" title="Watchlist">
                    Track assets you're interested in
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white bg-transparent hover:bg-white/10 hover:text-white",
                  )}
                >
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/learn" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white bg-transparent hover:bg-white/10 hover:text-white",
                  )}
                >
                  Learn
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <WalletConnect />
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none text-white">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-gray-400">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

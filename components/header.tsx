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
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import WalletConnect from "./wallet-connect"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-subtle">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle Menu" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6">
                <Link href="/" className="text-xl font-bold" onClick={() => setIsOpen(false)}>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
                    SolFund
                  </span>
                </Link>
                <div className="space-y-3">
                  <Link
                    href="/explore"
                    className="block text-base py-2 px-3 rounded-md hover:bg-secondary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Explore
                  </Link>
                  <Link
                    href="/create-pool"
                    className="block text-base py-2 px-3 rounded-md hover:bg-secondary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Pool
                  </Link>
                  <Link
                    href="/marketplace"
                    className="block text-base py-2 px-3 rounded-md hover:bg-secondary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Marketplace
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block text-base py-2 px-3 rounded-md hover:bg-secondary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/learn"
                    className="block text-base py-2 px-3 rounded-md hover:bg-secondary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Learn
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
              SolFund
            </span>
          </Link>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link href="/explore" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Explore</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/create-pool" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Create Pool</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Marketplace</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md gradient-bg p-6 no-underline outline-none focus:shadow-md overflow-hidden"
                        href="/marketplace"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium text-white">Marketplace</div>
                        <p className="text-sm leading-tight text-white/90">
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
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/learn" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Learn</NavigationMenuLink>
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
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

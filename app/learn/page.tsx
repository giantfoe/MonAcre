import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, FileText, GraduationCap, HelpCircle, PlayCircle } from "lucide-react"
import Link from "next/link"

export default function LearnPage() {
  const guides = [
    {
      title: "Getting Started with MonAcre",
      description: "Learn the basics of how to use the platform to create and invest in pools.",
    },
    {
      title: "Understanding Fractional Ownership",
      description: "Discover how blockchain enables fractional ownership of income-generating assets.",
      icon: <FileText className="h-6 w-6" />,
      link: "/learn/fractional-ownership",
    },
    {
      title: "Quadratic Voting Explained",
      description: "Learn how our democratic decision-making process works for funded pools.",
      icon: <GraduationCap className="h-6 w-6" />,
      link: "/learn/quadratic-voting",
    },
    {
      title: "Marketplace Trading Guide",
      description: "How to buy and sell ownership tokens on the SolFund marketplace.",
      icon: <PlayCircle className="h-6 w-6" />,
      link: "/learn/marketplace-guide",
    },
  ]

  const faqs = [
    {
      question: "How does MonAcre ensure the security of my investment?",
      answer: "MonAcre uses multi-signature wallets...",
    },
    {
      question: "What happens if a pool doesn't reach its funding goal?",
      answer:
        "If a pool doesn't reach its funding goal within the specified timeframe, all funds are automatically returned to the investors' wallets with no fees charged.",
    },
    {
      question: "How are profits distributed to investors?",
      answer:
        "Profits are distributed automatically through smart contracts based on each investor's ownership percentage. Distributions typically occur monthly, but can vary based on the specific asset.",
    },
    {
      question: "Can I sell my ownership tokens before the asset is sold?",
      answer:
        "Yes, you can sell your ownership tokens on the SolFund marketplace at any time. The price is determined by market demand and the performance of the asset.",
    },
    {
      question: "How does quadratic voting work?",
      answer:
        "Quadratic voting gives each investor voting power equal to the square root of their investment amount. This ensures that larger investors have more say, but prevents them from completely dominating decisions.",
    },
  ]

  return (
    <div className="container py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Educational resources to help you make the most of the SolFund platform.
        </p>
      </div>

      <Tabs defaultValue="guides">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="guides" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((guide, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
                      {guide.icon}
                    </div>
                    <CardTitle>{guide.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{guide.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  // Ensure href is always string
                  <Link href={guide.link ?? ''}>
                    <Button variant="outline">
                      Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about using the SolFund platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <div>
                      <h3 className="font-semibold">{faq.question}</h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/faq">
                <Button variant="outline">
                  View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="p-0">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800">
                  <div className="flex h-full items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">Introduction to SolFund</CardTitle>
                <CardDescription className="text-base">
                  Learn about the SolFund platform and how it enables fractional ownership of income-generating assets.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-0">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800">
                  <div className="flex h-full items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">How to Create a Pool</CardTitle>
                <CardDescription className="text-base">
                  Step-by-step guide to creating your first investment pool on SolFund.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-0">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800">
                  <div className="flex h-full items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">Investing in Pools</CardTitle>
                <CardDescription className="text-base">
                  Learn how to invest in pools and manage your investments on SolFund.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-0">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800">
                  <div className="flex h-full items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">Trading on the Marketplace</CardTitle>
                <CardDescription className="text-base">
                  How to buy and sell ownership tokens on the SolFund marketplace.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 rounded-lg bg-green-50 p-8 dark:bg-green-900">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-100">Still have questions?</h2>
            <p className="mt-2 text-green-700 dark:text-green-200">
              Our support team is here to help you with any questions you may have about the platform.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="bg-green-600 hover:bg-green-700">Contact Support</Button>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-100 hover:text-green-700 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-800"
            >
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

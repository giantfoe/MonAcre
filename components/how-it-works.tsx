import { CheckCircle2, Share2, Users, Wallet } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Wallet className="h-10 w-10 text-green-600" />,
      title: "Create a Pool",
      description: "Define your asset, funding goal, and make an initial contribution to start the pool.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-green-600" />,
      title: "Share Your Blink",
      description: "Share your unique blink link on social media to attract investors to your pool.",
    },
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: "Collect Investments",
      description: "Investors contribute to your pool using Solana tokens until the funding goal is reached.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-green-600" />,
      title: "Purchase & Profit",
      description: "Once funded, the asset is purchased and profits are automatically distributed to all investors.",
    },
  ]

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
              Our platform makes it easy to create and invest in income-generating assets
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                {step.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

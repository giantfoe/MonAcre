import { CheckCircle2, Share2, Users, Wallet } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Wallet className="h-10 w-10 text-purple-600" />,
      title: "Create a Pool",
      description: "Define your asset, funding goal, and make an initial contribution to start the pool.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-purple-600" />,
      title: "Share Your Blink",
      description: "Share your unique blink link on social media to attract investors to your pool.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600" />,
      title: "Collect Investments",
      description: "Investors contribute to your pool using Solana tokens until the funding goal is reached.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-purple-600" />,
      title: "Purchase & Profit",
      description: "Once funded, the asset is purchased and profits are automatically distributed to all investors.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-70"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-[800px] mx-auto mt-4">
              Our platform makes it easy to create and invest in income-generating assets
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 text-center transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 relative overflow-hidden group shadow-elevation-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-purple-600 dark:text-purple-400 relative z-10">{step.icon}</div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-10 left-full w-full h-0.5 bg-purple-200 dark:bg-purple-800 hidden lg:block"
                    style={{ width: "calc(100% - 5rem)" }}
                  ></div>
                )}
                <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="space-y-2 max-w-xs">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

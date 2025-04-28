import { CheckCircle2, Share2, Users, Wallet, Zap } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Wallet className="h-10 w-10 text-white" />,
      title: "Create a Pool",
      description: "Define your asset, funding goal, and make an initial contribution to start the pool.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-white" />,
      title: "Share Your Blink",
      description: "Share your unique blink link on social media to attract investors to your pool.",
    },
    {
      icon: <Users className="h-10 w-10 text-white" />,
      title: "Collect Investments",
      description: "Investors contribute to your pool using Solana tokens until the funding goal is reached.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-white" />,
      title: "Purchase & Profit",
      description: "Once funded, the asset is purchased and profits are automatically distributed to all investors.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMC41IiBmaWxsPSIjMzMzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-2">
              <Zap className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
              <span>Streamlined Process</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              How It Works
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-[800px] mx-auto mt-4">
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
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 relative overflow-hidden group shadow-lg shadow-purple-900/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Animated border */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[gradientShift_4s_ease_infinite]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[gradientShift_4s_ease_infinite_reverse]"></div>
                    <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/70 to-transparent animate-[gradientShift_4s_ease_infinite]"></div>
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/70 to-transparent animate-[gradientShift_4s_ease_infinite_reverse]"></div>
                  </div>

                  <div className="text-white relative z-10">{step.icon}</div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-600 to-transparent hidden lg:block"
                    style={{ width: "calc(100% - 5rem)" }}
                  ></div>
                )}
                <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold border border-white/20 shadow-lg shadow-purple-900/30">
                  {index + 1}
                </div>
              </div>
              <div className="space-y-2 max-w-xs">
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

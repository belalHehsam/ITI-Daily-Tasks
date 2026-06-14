import React from "react";

export default function HomeHero(): React.JSX.Element {
  return (
    <section className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 py-20">
        {/* Main Hero Content */}
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <span className="bg-zinc-900 text-gold-400 dark:bg-zinc-800 px-4 py-2 rounded-full text-sm font-semibold tracking-wide shadow-xs">
            Welcome to Products Store
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-5xl md:text-6xl font-black text-foreground tracking-tight">
            Discover Amazing
            <span className="text-gold-500 block sm:inline"> Products</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Explore thousands of high-quality products from trusted brands. Find
            the best deals, compare prices, and shop with confidence.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button className="bg-zinc-900 hover:bg-gold-500 text-white hover:text-black px-8 py-3.5 rounded-xl font-bold shadow-md hover:shadow-gold-500/10 hover:scale-102 active:scale-98 transition-all duration-200 dark:bg-zinc-800 dark:hover:bg-gold-500">
              Shop Now
            </button>

            <button className="border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white px-8 py-3.5 rounded-xl font-bold dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-all duration-200">
              Explore Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

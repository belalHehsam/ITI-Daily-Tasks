import React from "react";
import Link from "next/link";

export default function HomeHero(): React.JSX.Element {
  return (
    <section className="min-h-[85vh] flex items-center bg-background transition-colors duration-300 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Copywriting & Intro */}
          <div className="flex flex-col space-y-6 text-left">
            <span className="self-start px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-100 dark:text-gold-400 dark:bg-gold-50/10 border border-gold-500/20">
              Introducing Premium Store
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
              Curated Luxury. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600">
                Exceptional Value.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
              Welcome to the ultimate catalog of next-generation gadgets, lifestyle gear, and premium accessories. Every item is handpicked for craftsmanship, style, and top-tier performance. Discover deals today.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-gold-gradient hover:bg-gold-gradient-hover text-black font-extrabold rounded-xl shadow-lg shadow-gold-500/10 active:scale-95 transition-all duration-200"
              >
                Shop Collection
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 border border-card-border hover:bg-card text-foreground font-extrabold rounded-xl active:scale-95 transition-all duration-200"
              >
                Explore Catalog
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="relative flex justify-center items-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-card border border-card-border rounded-3xl p-6 shadow-xl dark:shadow-black/45 flex items-center justify-center overflow-hidden group">
              {/* Subtle gold glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-3xl blur-md opacity-20 group-hover:opacity-30 transition duration-300"></div>
              
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
                alt="Premium Product Showcase"
                className="relative max-h-full max-w-full object-contain rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

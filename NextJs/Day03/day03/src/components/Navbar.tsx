"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string): boolean => {
    if (!mounted) return false;
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path) || false;
  };

  return (
    <nav className="relative bg-card border-b border-card-border text-foreground transition-colors duration-300 shadow-xs z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-background hover:text-amber-500 focus:outline-hidden"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo & Desktop Menu */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center cursor-pointer"
            >
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=amber&shade=500"
                alt="Recipes Logo"
                className="h-8 w-auto filter drop-shadow-[0_0_4px_rgba(245,158,11,0.2)]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 justify-center items-center">
                {/* Home Link */}
                <Link
                  href="/"
                  className={`rounded-xl px-4 py-2 text-sm font-extrabold transition-all duration-200 ${
                    isActive("/")
                      ? "bg-gold-gradient text-black shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:bg-background hover:text-amber-500"
                  }`}
                >
                  Home
                </Link>

                {/* Recipes Link */}
                <Link
                  href="/recipes"
                  className={`rounded-xl px-4 py-2 text-sm font-extrabold transition-all duration-200 ${
                    isActive("/recipes")
                      ? "bg-gold-gradient text-black shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:bg-background hover:text-amber-500"
                  }`}
                >
                  Recipes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-card border-t border-card-border/5 animate-in slide-in-from-top duration-200">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {/* Home Mobile Link */}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-base font-bold ${
                isActive("/")
                  ? "bg-gold-gradient text-black"
                  : "text-gray-500 hover:bg-background hover:text-amber-500"
              }`}
            >
              Home
            </Link>

            {/* Recipes Mobile Link */}
            <Link
              href="/recipes"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-base font-bold ${
                isActive("/recipes")
                  ? "bg-gold-gradient text-black"
                  : "text-gray-500 hover:bg-background hover:text-amber-500"
              }`}
            >
              Recipes
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

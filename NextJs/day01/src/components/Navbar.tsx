import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const isActive = (path: string): boolean => {
    if (path === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(path);
  };

  return (
    <nav className="relative bg-card border-b border-card-border text-foreground transition-colors duration-300 shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-background hover:text-gold-500 focus:outline-hidden"
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                alt="Store Logo"
                className="h-8 w-auto filter drop-shadow-[0_0_4px_rgba(245,158,11,0.2)]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className={`rounded-xl px-4 py-2 text-sm font-extrabold transition-all duration-200 ${
                    isActive("/")
                      ? "bg-gold-gradient text-black shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:bg-background hover:text-gold-500"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className={`rounded-xl px-4 py-2 text-sm font-extrabold transition-all duration-200 ${
                    isActive("/products")
                      ? "bg-gold-gradient text-black shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:bg-background hover:text-gold-500"
                  }`}
                >
                  Products
                </Link>
                <Link
                  href="/admin"
                  className={`rounded-xl px-4 py-2 text-sm font-extrabold transition-all duration-200 ${
                    isActive("/admin")
                      ? "bg-gold-gradient text-black shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:bg-background hover:text-gold-500"
                  }`}
                >
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section: Light/Dark Toggle */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-xl p-2.5 text-gray-500 hover:text-gold-500 dark:text-gray-400 dark:hover:text-gold-400 hover:bg-background focus:outline-hidden transition-all cursor-pointer"
              onClick={() => toggleTheme()}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                /* Moon Icon for Light mode (click to go dark) */
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                /* Sun Icon for Dark mode (click to go light) */
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-card border-t border-card-border/5 animate-in slide-in-from-top duration-200">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link
              href="/"
              className={`block rounded-lg px-3 py-2.5 text-base font-bold ${
                isActive("/")
                  ? "bg-gold-gradient text-black"
                  : "text-gray-500 hover:bg-background hover:text-gold-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block rounded-lg px-3 py-2.5 text-base font-bold ${
                isActive("/products")
                  ? "bg-gold-gradient text-black"
                  : "text-gray-500 hover:bg-background hover:text-gold-500"
              }`}
            >
              Products
            </Link>
            <Link
              href="/admin"
              className={`block rounded-lg px-3 py-2.5 text-base font-bold ${
                isActive("/admin")
                  ? "bg-gold-gradient text-black"
                  : "text-gray-500 hover:bg-background hover:text-gold-500"
              }`}
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

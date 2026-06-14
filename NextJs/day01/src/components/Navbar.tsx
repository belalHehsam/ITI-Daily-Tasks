import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const isActive = (path: string): boolean => router.pathname === path;

  return (
    <nav className="relative bg-zinc-900 text-white border-b border-card-border/10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-zinc-800 hover:text-white focus:outline-hidden"
            >
              <span className="sr-only">Open main menu</span>
              {/* أيقونة فتح المنيو */}
              {!isMobileMenuOpen ? (
                <svg
                  className="size-6"
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
                /* أيقونة قفل المنيو */
                <svg
                  className="size-6"
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
                alt="Your Company"
                className="h-8 w-auto filter drop-shadow-[0_0_4px_rgba(245,158,11,0.2)]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className={`rounded-xl px-3 py-2 text-sm font-bold transition-all duration-200 ${
                    isActive("/")
                      ? "bg-gold-500 text-black shadow-xs"
                      : "text-gray-300 hover:bg-zinc-800 hover:text-gold-400"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className={`rounded-xl px-3 py-2 text-sm font-bold transition-all duration-200 ${
                    isActive("/products")
                      ? "bg-gold-500 text-black shadow-xs"
                      : "text-gray-300 hover:bg-zinc-800 hover:text-gold-400"
                  }`}
                >
                  Products
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section: Notifications & Profile Dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Notification Button */}
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-400 hover:text-gold-400 focus:outline-hidden transition-colors"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-zinc-950 border-t border-card-border/5 animate-in slide-in-from-top duration-200">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link
              href="/"
              className={`block rounded-lg px-3 py-2.5 text-base font-bold ${
                isActive("/")
                  ? "bg-gold-500 text-black"
                  : "text-gray-300 hover:bg-zinc-800 hover:text-gold-400"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block rounded-lg px-3 py-2.5 text-base font-bold ${
                isActive("/products")
                  ? "bg-gold-500 text-black"
                  : "text-gray-300 hover:bg-zinc-800 hover:text-gold-400"
              }`}
            >
              Products
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

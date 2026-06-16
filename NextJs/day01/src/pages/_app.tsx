import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Toaster as ToasterHotToast } from "react-hot-toast";
import { Toaster as ToasterSonner, toast as toastSonner } from "sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { SessionProvider } from "next-auth/react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface Quote {
  id: number;
  quote: string;
  author: string;
}

function QuotesManager({ initialQuote }: { initialQuote: Quote | null }) {
  const { data: quote } = useSWR<Quote>(
    "https://dummyjson.com/quotes/random",
    fetcher,
    {
      fallbackData: initialQuote || undefined,
      refreshInterval: 120000, // refresh every 2 minutes
      dedupingInterval: 100000, // dedupe requests within 10 seconds
    },
  );

  useEffect(() => {
    if (quote && quote.quote) {
      toastSonner(
        <div className="flex flex-col gap-2 p-1 text-foreground">
          <div className="flex items-start gap-1">
            <span className="text-2xl font-serif text-gold-500 leading-none">
              “
            </span>
            <p className="text-sm font-semibold italic leading-relaxed text-foreground">
              {quote.quote}
            </p>
            <span className="text-2xl font-serif text-gold-500 leading-none self-end">
              ”
            </span>
          </div>
          <span className="text-[10px] text-gold-600 dark:text-gold-400 font-extrabold tracking-wider uppercase self-end">
            — {quote.author}
          </span>
        </div>,
        {
          duration: 10000,
          className: "bg-card border border-card-border rounded-2xl shadow-lg",
        },
      );
    }
  }, [quote]);

  return null;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  if (Component.getLayout) {
    return (
      <SessionProvider session={session}>
        <ThemeProvider>
          <ToasterHotToast position="bottom-right" />
          <ToasterSonner position="bottom-right" richColors />
          <QuotesManager initialQuote={pageProps.initialQuote} />
          {Component.getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </SessionProvider>
    );
  }

  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider>
          <Navbar />
          <ToasterHotToast position="bottom-right" />
          <ToasterSonner position="bottom-right" richColors />
          <QuotesManager initialQuote={pageProps.initialQuote} />

          <main className="bg-background min-h-screen text-foreground transition-colors duration-300">
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

import React from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return <>{Component.getLayout(<Component {...pageProps} />)}</>;
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <main className="bg-background min-h-screen text-foreground transition-colors duration-300">
        <Component {...pageProps} />
      </main>
    </>
  );
}

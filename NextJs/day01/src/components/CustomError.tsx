import { useRouter } from "next/router";
import React from "react";

export default function CustomError(): React.JSX.Element {
  const router = useRouter();

  function goHome(): void {
    router.push("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="text-9xl font-extrabold text-gold-500/20 dark:text-gold-500/10 tracking-widest selection:bg-transparent">
        404
      </h1>

      <div className="mt-5 text-center">
        <p className="text-2xl font-semibold md:text-3xl text-foreground mb-6">
          OOOOps! Page NOT FOUND
        </p>

        <button
          onClick={goHome}
          className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-xl shadow-md hover:shadow-gold-500/20 transition-all duration-200 transform active:scale-95"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

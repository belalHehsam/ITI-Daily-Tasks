import fetcher from "@/lib/fetcher";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { IProduct } from "./types/product";
import Products from "./Products";

export default function HomeFeatured() {
  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold-500"></div>
      </div>
    );
  }
  console.log(data);
  if (error || !data) return null;

  const firstThreeProducts = data.data.slice(0, 3);

  function handleShowMore() {
    if (isAuthenticated) {
      router.push("/products");
    } else {
      signIn();
    }
  }

  return (
    <>
      <section className="py-12 bg-background border-t border-card-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-foreground">
              Featured Products
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Discover our top-rated selection
            </p>
          </div>

          <div className="mt-8 w-full">
            <Products products={firstThreeProducts} showFilters={false} />
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={handleShowMore}
              className="px-8 py-3 bg-gold-gradient text-black font-extrabold rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Show More
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

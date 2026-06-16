import Link from "next/link";
import { IProduct } from "../components/types/product";
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductsFilters from "./ProductsFilters";

interface ProductsProps {
  products: IProduct[];
  showFilters?: boolean;
}

export default function Products({
  products,
  showFilters = true,
}: ProductsProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Client-side filtering and sorting
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (
        selectedCategory !== "all" &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      // Search filter (matches title or description)
      if (search.trim() !== "") {
        const query = search.toLowerCase();
        const matchesTitle = product.title?.toLowerCase().includes(query);
        const matchesDesc = product.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      // Sorting
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }
      if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium bg-background">
        No products found.
      </div>
    );
  }

  return (
    <>
      {showFilters && (
        <ProductsFilters
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-medium bg-background">
          No matching products found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-background min-h-screen">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

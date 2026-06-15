import Link from "next/link";
import { IProduct } from "../components/types/product";
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductsFilters from "./ProductsFilters";

interface ProductsProps {
  products: IProduct[];
}

export default function Products({ products }: ProductsProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium bg-background">
        No products found.
      </div>
    );
  }

  return (
    <>
      <ProductsFilters
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-background min-h-screen">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

import Products from "@/components/Products";
import React from "react";
import { GetStaticProps } from "next";
import { Product } from "@/components/types/product";

// تعريف الـ Types للـ Props الخاصة بالصفحة
interface ProductsIndexProps {
  products: Product[];
}

export default function ProductsIndex({
  products,
}: ProductsIndexProps): React.JSX.Element {
  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <Products products={products} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<ProductsIndexProps> = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");

    if (!res.ok) {
      return {
        props: { products: [] },
      };
    }

    const data = await res.json();

    return {
      props: {
        products: data.products || [],
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error("Error in getStaticProps within products/index:", err);
    return {
      props: {
        products: [],
      },
    };
  }
};

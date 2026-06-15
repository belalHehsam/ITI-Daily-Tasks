import { KeyedMutator } from "swr";
import { IProduct } from "../types/product";
import AdminProductCard from "./AdminProductCard";
import Link from "next/link";

interface AdminProductsProps {
  products: IProduct[];
  mutate: KeyedMutator<any>;
}
export default function AdminProducts({
  products,
  mutate,
}: AdminProductsProps) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-black tracking-tight text-foreground">Admin Dashboard</h1>
        <Link
          href="/admin/new"
          className="inline-flex items-center justify-center px-5 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-xl shadow-xs transition-all duration-200 hover:scale-102 active:scale-98"
        >
          + Add Product
        </Link>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <AdminProductCard
            key={product._id}
            product={product}
            mutate={mutate}
          />
        ))}
      </div>
    </div>
  );
}

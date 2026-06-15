import { KeyedMutator } from "swr";
import { IProduct } from "../types/product";
import AdminProductCard from "./AdminProductCard";

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
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

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

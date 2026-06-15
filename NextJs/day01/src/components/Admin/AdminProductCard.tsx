import { IProduct } from "../types/product";
import AdminActions from "./AdminActions";

interface AdminProductCardProps {
  product: IProduct;
}

export default function AdminProductCard({ product }: AdminProductCardProps) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-20 h-20 rounded-lg object-cover"
        />

        <div>
          <h2 className="font-bold text-lg">{product.title}</h2>

          <p className="text-sm text-gray-500">{product.category}</p>

          <p className="font-semibold">${product.price}</p>
        </div>
      </div>

      <AdminActions id={product._id} />
    </div>
  );
}

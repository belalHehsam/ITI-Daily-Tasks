import { IProduct } from "./types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <>
      {/* Product Image & Brand Tag */}
      <div className="group relative bg-card rounded-2xl shadow-xs border border-card-border overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative w-full h-56 bg-background/50 dark:bg-zinc-950/40 overflow-hidden flex items-center justify-center p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.brand && (
            <span className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full dark:bg-zinc-800/80">
              {product.brand}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">
              {product.category}
            </span>
            <div className="flex items-center space-x-1 bg-gold-50 dark:bg-gold-100/10 px-2 py-0.5 rounded-md">
              <span className="text-gold-500 text-xs">★</span>
              <span className="text-xs font-bold text-gold-700 dark:text-gold-400">
                {product.rating?.toFixed(1) || "N/A"}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground line-clamp-1 mb-2 group-hover:text-gold-500 transition-colors duration-200">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
            {product.description}
          </p>

          {/* Price & Action Button */}
          <div className="flex items-center justify-between pt-3 border-t border-card-border mt-auto">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <Link
              href={`/products/${product._id}`}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-zinc-900 hover:bg-gold-500 text-white hover:text-black text-sm font-bold rounded-xl shadow-xs transition-all duration-200 dark:bg-zinc-700 dark:hover:bg-gold-500"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

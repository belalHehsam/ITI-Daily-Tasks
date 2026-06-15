import React from "react";
import { IProduct } from "../components/types/product";
interface ProductDetailsProps {
  product: IProduct | null;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps): React.JSX.Element {
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-gray-500">
        Product data is unavailable.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-card dark:bg-zinc-900 rounded-3xl shadow-xs border border-card-border overflow-hidden">
        {/* Main Product Section: Image & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
          {/* Left Column: Product Image */}
          <div className="bg-background dark:bg-zinc-950 rounded-2xl p-6 flex items-center justify-center min-h-[350px] md:min-h-[450px]">
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right Column: Detailed Info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category & Stock Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                    product.stock > 0
                      ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                      : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                  }`}
                >
                  {product.availabilityStatus || `${product.stock} In Stock`}
                </span>
              </div>

              {/* Title & Brand */}
              <h1 className="text-3xl font-black text-foreground mb-2 leading-tight">
                {product.title}
              </h1>
              {product.brand && (
                <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-6">
                  Brand:{" "}
                  <span className="text-foreground font-semibold">
                    {product.brand}
                  </span>
                </p>
              )}

              {/* Rating Star */}
              <div className="flex items-center space-x-1 mb-6">
                <div className="flex items-center bg-gold-500 text-black px-2.5 py-1 rounded-lg text-sm font-bold">
                  <span className="mr-1">★</span> {product.rating?.toFixed(1)}
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  ({product.reviews?.length || 0} customer reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-card-border py-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-400 block">Warranty</span>
                  <span className="font-medium text-foreground">
                    {product.warrantyInformation || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Shipping</span>
                  <span className="font-medium text-foreground">
                    {product.shippingInformation || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="bg-background dark:bg-zinc-950 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-gray-400 text-xs block uppercase tracking-wider font-semibold">
                  Price
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-foreground">
                    ${product.price}
                  </span>
                  {product.discountPercentage > 0 && (
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>
              </div>
              <button className="px-8 py-3.5 bg-gold-gradient hover:bg-gold-gradient-hover text-black font-extrabold rounded-xl shadow-md transition-all duration-200 transform active:scale-95 cursor-pointer">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

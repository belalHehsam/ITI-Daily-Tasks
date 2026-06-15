import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import EditProductForm from "@/components/Admin/EditProductForm";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  // Only fetch if id is available
  const { data, error, isLoading } = useSWR(
    id ? `/api/products/${id}` : null,
    fetcher
  );

  if (!id || isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 sm:p-10 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Loading product data...</h1>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (error || (data && !data.success)) {
    return (
      <div className="max-w-7xl mx-auto p-6 sm:p-10 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-6">We couldn't retrieve the requested product. It might have been deleted or the URL is invalid.</p>
        <Link
          href="/admin"
          className="inline-block px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-gold-500 hover:text-black transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const product = data?.data;

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Edit Product
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Updating: <span className="font-semibold text-gold-600 dark:text-gold-400">{product?.title}</span>
          </p>
        </div>
        <Link
          href="/admin"
          className="px-4 py-2 border border-card-border rounded-xl text-foreground font-bold hover:bg-card transition-all duration-200"
        >
          ← Back
        </Link>
      </div>

      {product && <EditProductForm product={product} />}
    </div>
  );
}

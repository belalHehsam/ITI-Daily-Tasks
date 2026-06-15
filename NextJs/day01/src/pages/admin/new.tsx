import AddProductForm from "@/components/Admin/AddProductForm";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Add New Product
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and publish a new product to the catalog.
          </p>
        </div>
        <Link
          href="/admin"
          className="px-4 py-2 border border-card-border rounded-xl text-foreground font-bold hover:bg-card transition-all duration-200"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <AddProductForm />
    </div>
  );
}

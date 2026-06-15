import Link from "next/link";
import { KeyedMutator } from "swr";
import { toast } from "react-hot-toast";

interface AdminActionsProps {
  id: string;
  mutate: KeyedMutator<any>;
}

export default function AdminActions({ id, mutate }: AdminActionsProps) {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");

    if (!confirmed) {
      return;
    }

    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Delete Failed");
        }

        await mutate();
        resolve(true);
      } catch (error: any) {
        console.error(error);
        reject(error);
      }
    });

    toast.promise(deletePromise, {
      loading: "Deleting product...",
      success: "Product deleted successfully!",
      error: (err) => err.message || "Failed to delete product",
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/admin/${id}`}
        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200"
      >
        Edit
      </Link>

      <button
        onClick={handleDelete}
        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}

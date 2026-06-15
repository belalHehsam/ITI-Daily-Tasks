import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import AdminProducts from "@/components/Admin/AdminProducts";
import { IProduct } from "@/components/types/product";

export default function AdminPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/products", fetcher);

  if (isLoading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  if (error) {
    return <h1 className="p-10 text-red-500">Something Went Wrong</h1>;
  }

  return <AdminProducts products={data.data as IProduct[]} mutate={mutate} />;
}

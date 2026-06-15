import Link from "next/link";

interface AdminActionsProps {
  id: string;
}

export default function AdminActions({ id }: AdminActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/admin/edit/${id}`}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white"
      >
        Edit
      </Link>

      <button className="px-4 py-2 rounded-lg bg-red-500 text-white">
        Delete
      </button>
    </div>
  );
}

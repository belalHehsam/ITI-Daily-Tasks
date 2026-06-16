import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";

interface IProductFormData {
  title: string;
  description: string;
  price: number | "";
  discountPercentage: number | "";
  rating: number | "";
  category: string;
  brand: string;
  stock: number | "";
  thumbnail: string;
  images: string;
}

export default function AddProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<IProductFormData>({
    title: "",
    description: "",
    price: "",
    discountPercentage: 0,
    rating: 0,
    category: "",
    brand: "",
    stock: "",
    thumbnail: "",
    images: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "discountPercentage" ||
        name === "rating" ||
        name === "stock"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!formData.title || formData.title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }
    if (!formData.description || formData.description.trim().length < 10) {
      toast.error("Description must be at least 10 characters");
      return;
    }
    if (formData.price === "" || Number(formData.price) < 0) {
      toast.error("Price cannot be negative");
      return;
    }
    if (
      formData.discountPercentage !== "" &&
      (Number(formData.discountPercentage) < 0 ||
        Number(formData.discountPercentage) > 100)
    ) {
      toast.error("Discount must be between 0 and 100");
      return;
    }
    if (
      formData.rating !== "" &&
      (Number(formData.rating) < 0 || Number(formData.rating) > 5)
    ) {
      toast.error("Rating must be between 0 and 5");
      return;
    }
    if (formData.stock === "" || Number(formData.stock) < 0) {
      toast.error("Stock cannot be negative");
      return;
    }
    if (!formData.category || formData.category.trim() === "") {
      toast.error("Category is required");
      return;
    }
    if (!formData.thumbnail || formData.thumbnail.trim() === "") {
      toast.error("Thumbnail is required");
      return;
    }

    setIsSaving(true);
    const createPromise = new Promise(async (resolve, reject) => {
      try {
        const imagesArray = formData.images
          ? formData.images
              .split(",")
              .map((img) => img.trim())
              .filter(Boolean)
          : [];

        const bodyData = {
          ...formData,
          images: imagesArray,
        };

        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to create product");
        }

        resolve(true);
        router.push("/admin");
      } catch (error: any) {
        console.error(error);
        reject(error);
      }
    });

    toast.promise(createPromise, {
      loading: "Creating product...",
      success: "Product created successfully!",
      error: (err) => err.message || "Failed to create product",
    });

    try {
      await createPromise;
    } catch {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300"
    >
      <div className="bg-card border border-card-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-foreground border-b border-card-border pb-4">
          Product Details
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-foreground"
          >
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Premium Wireless Headphones"
            className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-foreground"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of the product..."
            rows={4}
            className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors resize-y"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="price"
              className="text-sm font-semibold text-foreground"
            >
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors"
              required
            />
          </div>

          {/* Discount Percentage */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="discountPercentage"
              className="text-sm font-semibold text-foreground"
            >
              Discount Percentage (%)
            </label>
            <input
              id="discountPercentage"
              name="discountPercentage"
              type="number"
              step="0.01"
              value={formData.discountPercentage}
              onChange={handleChange}
              placeholder="0"
              className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="stock"
              className="text-sm font-semibold text-foreground"
            >
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="text-sm font-semibold text-foreground"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. electronics"
              className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors"
              required
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="brand"
              className="text-sm font-semibold text-foreground"
            >
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g. Brand Name"
              className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="rating"
              className="text-sm font-semibold text-foreground"
            >
              Rating (0 - 5)
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
              className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors"
            />
          </div>
        </div>

        {/* Thumbnail URL */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="thumbnail"
            className="text-sm font-semibold text-foreground"
          >
            Thumbnail URL <span className="text-red-500">*</span>
          </label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="url"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="https://example.com/thumbnail.jpg"
            className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors"
            required
          />
        </div>

        {/* Images URLs */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="images"
            className="text-sm font-semibold text-foreground"
          >
            Image URLs (comma separated)
          </label>
          <textarea
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            rows={2}
            className="px-4 py-3 rounded-xl border border-card-border bg-background text-foreground outline-hidden focus:border-gold-500 transition-colors resize-y"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-4">
        <button
          type="button"
          disabled={isSaving}
          onClick={() => router.push("/admin")}
          className="px-6 py-3 border border-card-border rounded-xl text-foreground font-bold hover:bg-card active:scale-95 disabled:opacity-50 transition-all duration-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-xl shadow-xs active:scale-95 disabled:opacity-50 transition-all duration-200 cursor-pointer"
        >
          {isSaving ? "Creating..." : "Create Product"}
        </button>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";
import { fetchProductById } from "@/services/api";
import { useCartStore } from "@/store/cart";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  tags: string[];
}

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchProductById(id);
        setProduct(response.data || null);
      } catch (err: unknown) {
        const message =
          typeof err === "object" && err !== null && "message" in err
            ? String((err as { message?: unknown }).message)
            : "Failed to load product";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "/placeholder.jpg",
      category: product.category,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700 dark:bg-zinc-950 dark:text-zinc-200">
        Loading product...
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center text-red-600 dark:bg-zinc-950">
        {error || "Product not found"}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="group relative overflow-hidden rounded-lg bg-slate-100 p-3 dark:bg-zinc-800">
            <img
              src={product.images?.[0] || "/placeholder.jpg"}
              alt={product.title}
              className="h-[420px] w-full rounded-md object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute left-6 top-6 rounded-md bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-widest text-orange-600 shadow-sm dark:bg-zinc-900/90">
              Premium Pick
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-orange-600">
                {product.category}
              </p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
                {product.title}
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-zinc-300">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-zinc-800 dark:bg-zinc-800">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                    Price
                  </p>
                  <span className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-md bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                  <Star className="h-4 w-4 fill-amber-500" />
                  {product.rating.toFixed(1)} Rated
                </div>
              </div>

              {added && (
                <div className="mt-5 flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Added to cart
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  Back to Products
                </Link>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

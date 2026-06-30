"use client";

import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, ProductFilters } from "@/services/api";
import ProductCard, { Product } from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const PAGE_SIZE = 12;

const sortOptions: Array<{ label: string; value: ProductFilters["sortBy"] }> = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

export default function ProductGrid() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState<ProductFilters["sortBy"]>("newest");
  const [page, setPage] = useState(1);

  const filters = useMemo<ProductFilters>(
    () => ({
      search,
      category,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
      sortBy,
      page,
      limit: PAGE_SIZE,
    }),
    [category, maxPrice, minRating, page, search, sortBy],
  );

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });

  const products: Product[] = data?.data || [];
  const meta = data?.meta || { currentPage: 1, totalPages: 1, totalItems: 0 };
  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean)),
  ).sort();

  const updateFilter = (action: () => void) => {
    setPage(1);
    action();
  };

  if (isError) {
    return (
      <section className="w-full bg-slate-50 px-4 py-16 text-center text-red-600 dark:bg-zinc-950">
        <p className="font-bold">Error loading products</p>
        <p className="mt-2 text-sm">{(error as Error).message}. Make sure backend is running.</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-slate-50 py-16 transition-colors duration-300 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-orange-600">
              Curated Catalog
            </span>
            <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
              Trending Masterpieces
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-zinc-400">
              {meta.totalItems || 0} products available
              {isFetching && !isLoading ? " - refreshing" : ""}
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => updateFilter(() => setSearch(event.target.value))}
              placeholder="Search products"
              className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </label>

          <label>
            <span className="sr-only">Category</span>
            <select
              value={category}
              onChange={(event) => updateFilter(() => setCategory(event.target.value))}
              className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Maximum price</span>
            <input
              value={maxPrice}
              onChange={(event) => updateFilter(() => setMaxPrice(event.target.value))}
              min="0"
              type="number"
              placeholder="Max price"
              className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </label>

          <label className="relative block">
            <span className="sr-only">Minimum rating</span>
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={minRating}
              onChange={(event) => updateFilter(() => setMinRating(event.target.value))}
              className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              <option value="">Any rating</option>
              <option value="4">4+ stars</option>
              <option value="3">3+ stars</option>
              <option value="2">2+ stars</option>
            </select>
          </label>

          <label>
            <span className="sr-only">Sort products</span>
            <select
              value={sortBy}
              onChange={(event) =>
                updateFilter(() => setSortBy(event.target.value as ProductFilters["sortBy"]))
              }
              className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            No products match your filters.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="h-10 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200"
              >
                Previous
              </button>
              <span className="text-sm font-bold text-slate-600 dark:text-zinc-300">
                Page {meta.currentPage} of {Math.max(1, meta.totalPages)}
              </span>
              <button
                type="button"
                disabled={page >= meta.totalPages}
                onClick={() => setPage((current) => current + 1)}
                className="h-10 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

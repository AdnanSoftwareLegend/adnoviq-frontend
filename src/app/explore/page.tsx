"use client";

import { useMemo, useState } from 'react';
import ProductCard, { Product } from '@/components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';

export default function ExplorePage() {
  const { data } = useQuery({ queryKey: ['products'], queryFn: () => fetchProducts() });
  const products = useMemo<Product[]>(() => data?.data || [], [data?.data]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    const next = [...products].filter((product) => {
      const text = `${product.title} ${product.description} ${product.category}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    });

    next.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return next;
  }, [products, search, category, sortBy]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-600">Explore</p>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Discover every product</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" className="rounded-2xl border border-slate-200 px-4 py-3" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3">
              <option>All</option>
              <option>APPAREL</option>
              <option>ELECTRONICS</option>
              <option>LIFESTYLE</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3">
              <option value="featured">Featured</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <ProductCard key={`${product._id}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

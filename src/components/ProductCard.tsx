"use client";

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Eye } from 'lucide-react';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // ইমেজ না থাকলে ডামি প্লেসহোল্ডার সেফটি গার্ড
  const displayImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "/placeholder.jpg";

  return (
    <div className="group flex flex-col justify-between h-[430px] w-full bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-600/30 dark:hover:border-orange-600/30 transition-all duration-300 relative">
      
      {/* ১. ইমেজ কন্টেইনার ও ব্যাজ */}
      <div className="relative h-48 w-full bg-slate-100 dark:bg-zinc-800/50 overflow-hidden">
        <img 
          src={displayImage} 
          alt={product.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* New/Premium ব্যাজ */}
        {product.isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-orange-600 text-white rounded-md shadow-sm">
            NEW
          </span>
        )}

        {/* হোভার অ্যাকশন ওভারলে (Quick View) */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button className="p-2.5 bg-white dark:bg-zinc-900 text-slate-800 dark:text-white rounded-full shadow-lg hover:scale-110 transition-transform" title="Quick View">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ২. কন্টেন্ট এরিয়া */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* ক্যাটাগরি */}
          <span className="text-[10px] font-black text-sky-500 dark:text-sky-400 uppercase tracking-widest">
            {product.category}
          </span>
          
          {/* টাইটেল */}
          <h3 className="text-base font-bold mt-1 text-slate-800 dark:text-zinc-100 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {product.title}
          </h3>
          
          {/* শর্ট ডেসক্রিপশন */}
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* ৩. মেটা ইনফো ও অ্যাকশন বাটন */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            {/* প্রাইস */}
            <span className="text-xl font-black text-slate-900 dark:text-white">
              ${(product.price || 0).toFixed(2)}
            </span>
            
            {/* রেটিং - সেফটি গার্ড সহ */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-500 text-xs font-bold">
              <Star className="h-3 w-3 fill-amber-500" /> 
              <span>{(product.rating || 0).toFixed(1)}</span>
            </div>
          </div>
          
          {/* ভিউ ডিটেইলস বাটন */}
          <Link
            href={`/product/${product._id}`}
            className="w-full py-2.5 bg-slate-900 hover:bg-orange-600 dark:bg-zinc-800 dark:hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
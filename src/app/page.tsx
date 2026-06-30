import React from 'react';
import ProductGrid from '@/components/ProductGrid';
import HeroSection from '@/components/HeroSection';

const highlights = [
  { title: 'AI-Powered Discovery', description: 'Smart recommendations and product insights help shoppers find the right fit quickly.' },
  { title: 'Premium Catalogue', description: 'Curated product experiences designed for modern brands and digital-first teams.' },
  { title: 'Seamless Checkout', description: 'A frictionless cart and checkout flow built for confidence and conversion.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <HeroSection />
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-zinc-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <ProductGrid />
    </div>
  );
}

"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/cart';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-600">Your Cart</p>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Shopping Cart</h1>
          </div>
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-orange-600 dark:text-zinc-300">
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-lg font-semibold text-slate-600 dark:text-zinc-300">Your cart is empty.</p>
            <Link href="/" className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center">
                  <img src={item.image} alt={item.title} className="h-24 w-24 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">{item.category}</p>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full border px-3 py-1 text-lg">−</button>
                    <span className="min-w-6 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full border px-3 py-1 text-lg">+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-sm font-semibold text-red-500">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Order Summary</h2>
              <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-zinc-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-black text-slate-900 dark:border-zinc-800 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
                Checkout
              </button>
              <button onClick={clearCart} className="mt-3 w-full rounded-2xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:border-red-500 hover:text-red-500 dark:border-zinc-700 dark:text-zinc-200">
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import React from "react";
import { Quote, ShieldCheck, Star } from "lucide-react";
import { usePathname } from "next/navigation";

const customerReviews = [
  {
    name: "Maya Rahman",
    role: "Smart Home Collector",
    quote:
      "ADNOVIQ feels different from a normal store. The recommendations are sharp, the products feel premium, and checkout was effortless.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&auto=format&fit=crop&q=80",
  },
  {
    name: "Daniel Carter",
    role: "Audio Enthusiast",
    quote:
      "I found a studio-grade headphone setup in minutes. The product details and curated picks made the decision feel easy.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80",
  },
  {
    name: "Nadia Islam",
    role: "Lifestyle Buyer",
    quote:
      "The catalog is polished and trustworthy. Every item felt selected with taste, not just listed for the sake of volume.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
  },
  {
    name: "Ethan Brooks",
    role: "Tech Reviewer",
    quote:
      "Fast shipping, elegant packaging, and premium products. One of the best online shopping experiences I've had.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&auto=format&fit=crop&q=80",
  },
  {
    name: "Sophia Ahmed",
    role: "Fashion Shopper",
    quote:
      "Everything feels carefully selected. I always discover something unique whenever I visit ADNOVIQ.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&auto=format&fit=crop&q=80",
  },
  {
    name: "Ryan Mitchell",
    role: "Gadget Lover",
    quote:
      "Excellent customer support and authentic products. The website is clean, modern, and very easy to navigate.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=240&auto=format&fit=crop&q=80",
  },
];

export default function CustomerReviewSection() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  const scrollingReviews = [...customerReviews, ...customerReviews];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent dark:from-zinc-950" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent dark:from-zinc-950" />

          <div className="review-swipe-track flex w-max gap-6">
            {scrollingReviews.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="w-[320px] shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-4">
                  <div
                    role="img"
                    aria-label={review.name}
                    className="h-16 w-16 shrink-0 rounded-full border-2 border-white bg-cover bg-center shadow-lg dark:border-zinc-700"
                    style={{ backgroundImage: `url(${review.image})` }}
                  />

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {review.name}
                    </h3>

                    <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-zinc-500">
                      {review.role}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <Quote className="h-7 w-7 text-indigo-600" />

                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="mt-5 leading-7 text-slate-600 dark:text-zinc-300">
                  &quot;{review.quote}&quot;
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

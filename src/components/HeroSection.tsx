"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface SlideItem {
  id: number;
  badge: string;
  titleLight: string;
  titleBold: string;
  description: string;
  ctaText: string;
  imgUrl: string;
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ইন্ডাস্ট্রি লেভেল ডাইনামিক ডেটা স্লাইডার
  const slides: SlideItem[] = [
    {
      id: 1,
      badge: "AI-DRIVEN SOPHISTICATION",
      titleLight: "THE CURATED FUTURE OF",
      titleBold: "LUXURY SHOPPING.",
      description: "Explore ADNOVIQ's intelligently curated collection of premium electronics and lifestyle products, powered by AI recommendations for unrivaled innovation.",
      ctaText: "EXPLORE NOW",
      imgUrl: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=80", // Premium Device Mock
    },
    {
      id: 2,
      badge: "NEXT-GEN AUDIO SYSTEMS",
      titleLight: "IMMERSE YOURSELF IN",
      titleBold: "PURE SOUND.",
      description: "Experience acoustic engineering optimized by advanced machine learning models to adapt perfectly to your unique environment.",
      ctaText: "DISCOVER AUDIO",
      imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    }
  ];

  // অটো-প্লে স্লাইডার মেকানিজম (Performance optimized)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[65vh] min-h-[500px] max-h-[650px] overflow-hidden bg-slate-50 dark:bg-zinc-950 flex items-center border-b border-slate-200/50 dark:border-zinc-900/50 transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড রেডিয়াল গ্রেডিয়েন্ট এবং ম্যাট্রিক্স ভাইব */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-70">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-sky-500/10 dark:bg-sky-600/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1400px] w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* বাম দিক: টেক্সট কন্টেন্ট এরিয়া (৬ কলাম) */}
          <div className="md:col-span-7 flex flex-col items-start space-y-4 md:space-y-6">
            
            {/* ডাইনামিক ব্যাজ */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-200/60 dark:bg-zinc-900/80 border border-slate-300/50 dark:border-zinc-800/60 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand-secondary animate-pulse" />
              <span className="text-[10px] md:text-xs font-black tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
                {slides[currentSlide].badge}
              </span>
            </div>

            {/* মেইন হেডিং */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-2xl">
              {slides[currentSlide].titleLight} <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-brand-primary to-brand-secondary dark:from-white dark:via-zinc-100 dark:to-zinc-400">
                {slides[currentSlide].titleBold}
              </span>
            </h1>

            {/* ডেসক্রিপশন */}
            <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl font-medium">
              {slides[currentSlide].description}
            </p>

            {/* কল-টু-অ্যাকশন ইন্টারঅ্যাক্টিভ বাটন */}
            <div className="pt-2">
              <button className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-primary text-white text-sm font-bold tracking-wide overflow-hidden shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  {slides[currentSlide].ctaText}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>

          {/* ডান দিক: মডার্ন ৩ডি গ্লাস স্ট্রাকচার ও প্রোডাক্ট শোকেস (৫ কলাম) */}
          <div className="hidden md:col-span-5 md:flex relative justify-center items-center h-[400px]">
            
            {/* ৩ডি গ্লাস স্ল্যাটস/প্যানেল ইফেক্ট (`watermarked_img_10298587392987731834.png` এর মতো) */}
            <div className="absolute w-[280px] h-[280px] rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 transform -rotate-12 translate-x-4 translate-y-4 backdrop-blur-[2px] pointer-events-none" />
            <div className="absolute w-[260px] h-[260px] rounded-2xl bg-zinc-900/20 dark:bg-zinc-900/40 border border-zinc-800/40 transform rotate-6 -translate-x-4 -translate-y-2 backdrop-blur-[1px] pointer-events-none" />
            
            {/* মেইন ইমেজ কন্টেইনার */}
            <div className="relative w-[240px] h-[320px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md p-3 shadow-2xl group transition-transform duration-500 hover:scale-[1.02]">
              <div className="w-full h-full rounded-xl bg-slate-100 dark:bg-zinc-800/80 overflow-hidden relative">
                <img
                  src={slides[currentSlide].imgUrl}
                  alt="ADNOVIQ Featured Premium Product"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

        </div>

        {/* স্লাইডার নেভিগেশন কন্ট্রোল (একেবারে নিচের কোণায় সুক্ষ্ম ডিজাইন) */}
        <div className="absolute bottom-6 right-4 sm:right-6 lg:right-8 flex items-center space-x-3 z-20">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full border border-slate-300/60 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-slate-700 dark:text-zinc-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex space-x-1.5">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-6 bg-brand-primary" : "w-1.5 bg-slate-300 dark:bg-zinc-800"}`} 
              />
            ))}
          </div>
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full border border-slate-300/60 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-slate-700 dark:text-zinc-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
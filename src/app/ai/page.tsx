"use client";

import { useState } from "react";
import axios from "axios";

export default function AIDemoPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("LIFESTYLE");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post("products/ai-generate", {
        title,
        category,
      });
      setResult(response.data?.description || "AI content unavailable");
    } catch (error) {
      setResult("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-600">
          AI Content Generator
        </p>
        <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
          Generate polished product descriptions
        </h1>
        <div className="mt-8 space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Product title"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          >
            <option>LIFESTYLE</option>
            <option>ELECTRONICS</option>
            <option>APPAREL</option>
          </select>
          <button
            onClick={handleGenerate}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"
          >
            {loading ? "Generating..." : "Generate AI Copy"}
          </button>
        </div>
        {result ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            {result}
          </div>
        ) : null}
      </div>
    </main>
  );
}

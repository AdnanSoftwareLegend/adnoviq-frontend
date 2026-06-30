import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between aspect-[3/4]">
      <div className="w-full h-48 bg-slate-200 dark:bg-zinc-800 rounded-xl mb-4" />
      <div className="space-y-3 flex-1">
        <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded w-1/3" />
        <div className="h-5 bg-slate-200 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded w-full" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="h-6 bg-slate-200 dark:bg-zinc-800 rounded w-1/4" />
        <div className="h-9 bg-slate-200 dark:bg-zinc-800 rounded w-1/3" />
      </div>
    </div>
  );
}
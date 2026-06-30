"use client";

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
 const [queryClient] = useState(() => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,      // ডেটা সাথে সাথে বাসি (stale) হয়ে যাবে
      gcTime: 0,         // কোনো ক্যাশ মেমোরি জমাবে না
      refetchOnWindowFocus: true, 
    },
  },
}));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const authError = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Create account</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">Join ADNOVIQ to save items and track your orders.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input value={name} onChange={(e) => { clearError(); setName(e.target.value); }} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white" placeholder="Full name" autoComplete="name" />
          <input type="email" value={email} onChange={(e) => { clearError(); setEmail(e.target.value); }} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white" placeholder="Email" autoComplete="email" />
          <input type="password" value={password} onChange={(e) => { clearError(); setPassword(e.target.value); }} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white" placeholder="Password" autoComplete="new-password" />
          {authError ? <p className="text-sm text-red-500">{authError}</p> : null}
          <button disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70">
            <UserPlus className="h-4 w-4" />
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600 dark:text-zinc-400">
          Already have an account? <Link href="/login" className="font-semibold text-orange-600">Log in</Link>
        </p>
      </div>
    </main>
  );
}

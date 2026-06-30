"use client";

import { useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { AuthUser } from "@/store/auth";
import { useAuthStore } from "@/store/auth";
import { ArrowLeft, BadgeCheck, CalendarDays, Mail, Save, ShieldCheck, UserRound } from "lucide-react";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-zinc-950">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-slate-600 dark:text-zinc-300">Please log in first.</p>
          <Link href="/login" className="mt-4 inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return <ProfileForm key={user.id || user.email} user={user} />;
}

function ProfileForm({ user }: { user: AuthUser }) {
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [saved, setSaved] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const joined = user.createdAt
    ? new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(user.createdAt))
    : "Recently";

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(false);
    const success = await updateProfile({ name, email });
    setSaved(success);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-orange-600 dark:text-zinc-300">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-900 text-2xl font-black text-white dark:bg-white dark:text-slate-950">
                {initials || "AD"}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-black text-slate-900 dark:text-white">{user.name}</h1>
                <p className="truncate text-sm text-slate-500 dark:text-zinc-400">{user.email}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              <ProfileFact icon={ShieldCheck} label="Role" value={user.role} />
              <ProfileFact icon={CalendarDays} label="Joined" value={joined} />
              <ProfileFact icon={BadgeCheck} label="Status" value="Active session" />
            </div>
          </aside>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-black uppercase text-orange-600">Profile</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Editable user information</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">Name and email are saved through the authenticated backend profile endpoint.</p>

            <form onSubmit={handleSave} className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-zinc-200">
                Full name
                <span className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={name}
                    onChange={(event) => {
                      clearError();
                      setSaved(false);
                      setName(event.target.value);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                    placeholder="Full name"
                    autoComplete="name"
                  />
                </span>
              </label>

              <label className="grid gap-2 text-sm font-bold text-slate-700 dark:text-zinc-200">
                Email address
                <span className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      clearError();
                      setSaved(false);
                      setEmail(event.target.value);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                    placeholder="Email"
                    autoComplete="email"
                  />
                </span>
              </label>

              <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 md:grid-cols-2">
                <ProfileFact icon={ShieldCheck} label="Role permission" value={user.role} />
                <ProfileFact icon={BadgeCheck} label="Dashboard access" value={user.role === "Admin" ? "Full access" : user.role === "Manager" ? "Team access" : "Personal access"} />
              </div>

              {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}
              {saved ? <p className="text-sm font-semibold text-emerald-600">Profile updated.</p> : null}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save changes"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

function ProfileFact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/30">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-bold uppercase text-slate-400">{label}</span>
        <span className="block truncate text-sm font-black text-slate-900 dark:text-white">{value}</span>
      </span>
    </div>
  );
}

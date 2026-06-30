"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  ShoppingCart,
  Sun,
  User,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const isLoggedIn = Boolean(user);
  const initials =
    user?.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD";

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDarkMode = theme === "dark" || (!theme && prefersDark);
    const timer = window.setTimeout(() => {
      setIsDarkMode(shouldUseDarkMode);
      setHasMounted(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [hasMounted, isDarkMode]);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    localStorage.setItem("theme", nextMode ? "dark" : "light");
    setIsDarkMode(nextMode);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    setIsOpen(false);
  };

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "AI Studio", href: "/ai" },
  ];

  const privateLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
    { name: "AI Studio", href: "/ai" },
    { name: "Cart", href: "/cart" },
  ];

  const activeLinks = isLoggedIn ? privateLinks : publicLinks;

  return (
    <nav className="glass-nav sticky top-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-wider text-brand-primary dark:text-white">
            ADNOVIQ<span className="text-brand-secondary">.</span>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            {activeLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-brand-primary ${
                    isActive
                      ? "border-b-2 border-brand-primary pb-1 font-bold text-brand-primary"
                      : "text-slate-600 dark:text-zinc-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center space-x-6 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-zinc-900"
              aria-label="Toggle theme"
            >
              {hasMounted && isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>

            {isLoggedIn ? (
              <>
                <Link href="/wishlist" className="relative p-2 text-slate-600 hover:text-brand-primary dark:text-zinc-400">
                  <Heart className="h-5 w-5" />
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    2
                  </span>
                </Link>

                <Link href="/cart" className="relative p-2 text-slate-600 hover:text-brand-primary dark:text-zinc-400">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                </Link>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProfileMenu((value) => !value)}
                    className="flex items-center space-x-2 rounded-full border border-slate-200 p-1.5 hover:shadow-sm dark:border-zinc-800"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary text-sm font-bold text-white">
                      {initials}
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-60 rounded-lg border border-slate-100 bg-white p-2 text-slate-800 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                      <div className="mb-1 border-b border-slate-100 px-3 py-2 dark:border-zinc-800">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="truncate text-sm font-bold">{user?.name}</p>
                        <span className="mt-1 inline-block rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-brand-primary dark:bg-indigo-950/50">
                          {user?.role}
                        </span>
                      </div>
                      <Link href="/dashboard" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800">
                        <LayoutDashboard className="h-4 w-4" /> <span>Dashboard</span>
                      </Link>
                      <Link href="/profile" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800">
                        <User className="h-4 w-4" /> <span>Manage Profile</span>
                      </Link>
                      <Link href="/settings" className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800">
                        <Settings className="h-4 w-4" /> <span>Settings</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <LogOut className="h-4 w-4" /> <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link href="/login" className="rounded-full bg-brand-primary px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
                Login
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <button type="button" onClick={toggleTheme} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-zinc-900" aria-label="Toggle theme">
              {hasMounted && isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>
            <button type="button" onClick={() => setIsOpen((value) => !value)} className="p-2 text-slate-600 dark:text-zinc-400" aria-label="Toggle navigation">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="space-y-3 border-t border-slate-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          {activeLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-3 py-2 text-base font-semibold ${
                pathname === link.href ? "bg-indigo-50 text-brand-primary dark:bg-indigo-950/30" : "text-slate-600 dark:text-zinc-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center justify-between border-t border-slate-100 px-3 pt-4 dark:border-zinc-900">
            <span className="text-sm font-bold">Account Session</span>
            {isLoggedIn ? (
              <button type="button" onClick={handleLogout} className="text-sm font-bold text-brand-primary">
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm font-bold text-brand-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

import Link from "next/link";
import { Globe, Mail, MapPin, MessageCircle, Send, Share2, ShieldCheck, Truck } from "lucide-react";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "Explore", href: "/explore" },
      { label: "AI Studio", href: "/ai" },
      { label: "Cart", href: "/cart" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
];

const socialLinks = [
  { label: "Website", href: "https://adnoviq.com", icon: Globe },
  { label: "Community", href: "https://adnoviq.com/community", icon: MessageCircle },
  { label: "Updates", href: "https://adnoviq.com/updates", icon: Send },
  { label: "Share", href: "https://adnoviq.com/share", icon: Share2 },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-md">
            <Link href="/" className="text-2xl font-black tracking-wider text-brand-primary dark:text-white">
              ADNOVIQ<span className="text-brand-secondary">.</span>
            </Link>
            <p className="mt-4 text-sm leading-6">
              Premium shopping for modern essentials, curated with smart discovery and a polished customer experience.
            </p>
            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-brand-primary" />
                <span>Fast delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-brand-primary" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-zinc-100">{group.title}</h2>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm transition-colors hover:text-brand-primary">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-slate-100 pt-6 dark:border-zinc-900 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-primary" />
              <span>support@adnoviq.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-primary" />
              <span>Serving shoppers worldwide</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-zinc-800 dark:text-zinc-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 ADNOVIQ. All rights reserved.</p>
          <p>Built for secure, smarter shopping.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Bell,
  Boxes,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Home,
  LineChart,
  LogOut,
  Package,
  PieChart,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import type { AuthUser, UserRole } from "@/store/auth";
import { useAuthStore } from "@/store/auth";

type DashboardSection = "overview" | "orders" | "analytics" | "team" | "products" | "settings" | "billing";

interface MenuItem {
  key: DashboardSection;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
}

const sidebarItems: MenuItem[] = [
  { key: "overview", label: "Overview", icon: Home, roles: ["User", "Manager", "Admin"] },
  { key: "orders", label: "Orders", icon: ClipboardList, roles: ["User", "Manager", "Admin"] },
  { key: "analytics", label: "Analytics", icon: BarChart3, roles: ["User", "Manager", "Admin"] },
  { key: "team", label: "Team", icon: Users, roles: ["Manager", "Admin"] },
  { key: "products", label: "Products", icon: Boxes, roles: ["Manager", "Admin"] },
  { key: "billing", label: "Billing", icon: CreditCard, roles: ["Admin"] },
  { key: "settings", label: "Settings", icon: Settings, roles: ["Admin"] },
];

const roleMultiplier: Record<UserRole, number> = {
  User: 1,
  Manager: 4,
  Admin: 9,
};

const roleScope: Record<UserRole, string> = {
  User: "Personal workspace",
  Manager: "Team workspace",
  Admin: "Platform workspace",
};

function buildDashboardData(user: AuthUser) {
  const multiplier = roleMultiplier[user.role];
  const joined = user.createdAt ? new Date(user.createdAt) : new Date("2026-01-15");
  const accountAge = Math.max(1, Math.ceil((Date.now() - joined.getTime()) / 86_400_000));
  const nameSeed = user.name.length + user.email.length;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const monthlyRevenue = months.map((month, index) => ({
    month,
    value: (index + 2) * 420 * multiplier + nameSeed * 13 + accountAge * 2,
  }));

  const activityTrend = months.map((month, index) => ({
    month,
    value: Math.round(18 * multiplier + index * (6 + multiplier) + (nameSeed % 11)),
  }));

  const trafficSources = [
    { label: "Store", value: 36 + multiplier * 2, color: "#2563eb" },
    { label: "AI Studio", value: 24 + (nameSeed % 8), color: "#f97316" },
    { label: "Referral", value: 18 + multiplier, color: "#16a34a" },
    { label: "Direct", value: 22, color: "#9333ea" },
  ];

  const rows = [
    { id: "ORD-1048", owner: user.role === "User" ? user.name : "Ari Lane", status: "Processing", amount: 129 * multiplier, date: "2026-06-24" },
    { id: "ORD-1047", owner: user.role === "User" ? user.name : "Nora Park", status: "Shipped", amount: 249 * multiplier, date: "2026-06-22" },
    { id: "ORD-1046", owner: user.role === "User" ? user.name : "Mina Cole", status: "Review", amount: 89 * multiplier, date: "2026-06-19" },
    { id: "ORD-1045", owner: user.role === "Admin" ? "Platform Ops" : user.name, status: "Delivered", amount: 319 * multiplier, date: "2026-06-15" },
  ];

  const cards = [
    { label: user.role === "User" ? "Total spending" : "Managed revenue", value: `$${monthlyRevenue.reduce((sum, item) => sum + item.value, 0).toLocaleString()}`, icon: CreditCard, tone: "blue" },
    { label: user.role === "User" ? "Active orders" : "Active orders", value: String(rows.filter((row) => row.status !== "Delivered").length * multiplier), icon: ShoppingBag, tone: "orange" },
    { label: user.role === "User" ? "Saved items" : "Products tracked", value: String(12 * multiplier + (nameSeed % 9)), icon: Package, tone: "green" },
    { label: "Role access", value: user.role, icon: ShieldCheck, tone: "purple" },
  ];

  return { monthlyRevenue, activityTrend, trafficSources, rows, cards };
}

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");
  const [profileOpen, setProfileOpen] = useState(false);

  const data = useMemo(() => (user ? buildDashboardData(user) : null), [user]);
  const visibleItems = useMemo(() => sidebarItems.filter((item) => (user ? item.roles.includes(user.role) : false)), [user]);

  if (!user || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-zinc-950">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-slate-600 dark:text-zinc-300">Please log in to view dashboard.</p>
          <Link href="/login" className="mt-4 inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900 lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <div className="flex items-center justify-between lg:block">
            <div>
              <p className="text-xs font-black uppercase text-orange-600">RBAC Dashboard</p>
              <h1 className="mt-1 text-xl font-black">ADNOVIQ</h1>
            </div>
            <span className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold dark:border-zinc-800 lg:mt-4 lg:inline-block">{user.role}</span>
          </div>

          <nav className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveSection(item.key)}
                  className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-bold transition ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                      : "text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-zinc-400">{roleScope[user.role]}</p>
                <h2 className="text-2xl font-black">Welcome, {user.name}</h2>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className="rounded-lg border border-slate-200 p-3 text-slate-600 hover:bg-slate-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((value) => !value)}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 pr-3 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white dark:bg-white dark:text-slate-950">{initials}</span>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </button>
                  {profileOpen ? (
                    <div className="absolute right-0 mt-2 w-64 rounded-lg border border-slate-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="border-b border-slate-100 px-3 py-3 dark:border-zinc-800">
                        <p className="truncate text-sm font-black">{user.name}</p>
                        <p className="truncate text-xs text-slate-500 dark:text-zinc-400">{user.email}</p>
                      </div>
                      <Link href="/profile" className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800">
                        <UserRound className="h-4 w-4" /> Profile
                      </Link>
                      <button type="button" onClick={() => setActiveSection("settings")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800">
                        <Settings className="h-4 w-4" /> Account actions
                      </button>
                      <button type="button" onClick={handleLogout} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-6 px-4 py-6 sm:px-6">
            <RoleNotice role={user.role} menuCount={visibleItems.length} />
            <OverviewCards cards={data.cards} />
            <DashboardCharts revenue={data.monthlyRevenue} activity={data.activityTrend} sources={data.trafficSources} />
            <DataTables role={user.role} rows={data.rows} activeSection={activeSection} />
          </div>
        </section>
      </div>
    </main>
  );
}

function RoleNotice({ role, menuCount }: { role: UserRole; menuCount: number }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-orange-600">{role} Access</p>
          <h3 className="mt-1 text-xl font-black">Role-based navigation is active</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
            This role currently receives {menuCount} dashboard menu items. User roles get at least 3 items, while Admin receives 5 or more.
          </p>
        </div>
        <Link href="/profile" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600">
          <UserRound className="h-4 w-4" />
          Edit profile
        </Link>
      </div>
    </section>
  );
}

function OverviewCards({ cards }: { cards: ReturnType<typeof buildDashboardData>["cards"] }) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
    orange: "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300",
    green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300",
    purple: "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300",
  };

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className={`inline-flex rounded-lg p-3 ${colorMap[card.tone]}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500 dark:text-zinc-400">{card.label}</p>
            <p className="mt-2 text-2xl font-black">{card.value}</p>
          </div>
        );
      })}
    </section>
  );
}

function DashboardCharts({
  revenue,
  activity,
  sources,
}: {
  revenue: { month: string; value: number }[];
  activity: { month: string; value: number }[];
  sources: { label: string; value: number; color: string }[];
}) {
  return (
    <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-black">Revenue by month</h3>
        </div>
        <BarChart data={revenue} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-black">Activity trend</h3>
          </div>
          <LineChartSvg data={activity} />
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-black">Channel mix</h3>
          </div>
          <PieChartBlock sources={sources} />
        </div>
      </div>
    </section>
  );
}

function BarChart({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <div className="mt-6 flex h-72 items-end gap-3">
      {data.map((item) => (
        <div key={item.month} className="flex h-full flex-1 flex-col justify-end gap-2">
          <div className="flex flex-1 items-end rounded-lg bg-slate-100 p-1 dark:bg-zinc-800">
            <div className="w-full rounded-md bg-blue-600 transition-all" style={{ height: `${Math.max(12, (item.value / max) * 100)}%` }} />
          </div>
          <div className="text-center">
            <p className="text-xs font-black">{item.month}</p>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">${Math.round(item.value / 1000)}k</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function LineChartSvg({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map((item) => item.value));
  const min = Math.min(...data.map((item) => item.value));
  const points = data.map((item, index) => {
    const x = 20 + index * (260 / Math.max(1, data.length - 1));
    const y = 120 - ((item.value - min) / Math.max(1, max - min)) * 90;
    return { ...item, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <div className="mt-4">
      <svg viewBox="0 0 300 150" className="h-44 w-full" role="img" aria-label="Activity line chart">
        <path d="M 20 125 H 280" stroke="#cbd5e1" strokeWidth="2" />
        <path d={path} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <circle key={point.month} cx={point.x} cy={point.y} r="5" fill="#f97316" />
        ))}
      </svg>
      <div className="grid grid-cols-6 gap-2 text-center text-xs font-bold text-slate-500 dark:text-zinc-400">
        {data.map((item) => (
          <span key={item.month}>{item.month}</span>
        ))}
      </div>
    </div>
  );
}

function PieChartBlock({ sources }: { sources: { label: string; value: number; color: string }[] }) {
  const total = sources.reduce((sum, source) => sum + source.value, 0);
  const gradient = sources
    .reduce<{ cursor: number; slices: string[] }>(
      (result, source) => {
        const end = result.cursor + (source.value / total) * 100;
        return {
          cursor: end,
          slices: [...result.slices, `${source.color} ${result.cursor}% ${end}%`],
        };
      },
      { cursor: 0, slices: [] },
    )
    .slices.join(", ");

  return (
    <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
      <div className="mx-auto h-36 w-36 shrink-0 rounded-full" style={{ background: `conic-gradient(${gradient})` }} />
      <div className="grid flex-1 gap-2">
        {sources.map((source) => (
          <div key={source.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 font-semibold">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: source.color }} />
              {source.label}
            </span>
            <span className="font-black">{Math.round((source.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataTables({
  role,
  rows,
  activeSection,
}: {
  role: UserRole;
  rows: ReturnType<typeof buildDashboardData>["rows"];
  activeSection: DashboardSection;
}) {
  const teamRows = [
    { name: "Ari Lane", permission: "Manager", workload: "18 orders", health: "On track" },
    { name: "Nora Park", permission: "Support", workload: "12 orders", health: "Watching" },
    { name: "Mina Cole", permission: "Catalog", workload: "26 products", health: "On track" },
  ];

  return (
    <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-zinc-800">
          <div>
            <h3 className="text-lg font-black">Recent records</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Table reflects the current {role} view and selected {activeSection} section.</p>
          </div>
          <Activity className="h-5 w-5 text-orange-600" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-zinc-950 dark:text-zinc-400">
              <tr>
                <th className="px-5 py-3">Record</th>
                <th className="px-5 py-3">Owner</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-5 py-4 font-black">{row.id}</td>
                  <td className="px-5 py-4">{row.owner}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-black dark:bg-zinc-800">{row.status}</span>
                  </td>
                  <td className="px-5 py-4 font-bold">${row.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-slate-500 dark:text-zinc-400">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-slate-200 p-5 dark:border-zinc-800">
          <h3 className="text-lg font-black">{role === "User" ? "Personal actions" : "Team permissions"}</h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Visible data changes with the active role.</p>
        </div>
        {role === "User" ? (
          <div className="grid gap-3 p-5">
            {["Review open order", "Update saved address", "Check AI recommendations"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-zinc-800">
                <Sparkles className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-bold">{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-zinc-950 dark:text-zinc-400">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Access</th>
                  <th className="px-5 py-3">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {teamRows.map((row) => (
                  <tr key={row.name}>
                    <td className="px-5 py-4 font-black">{row.name}</td>
                    <td className="px-5 py-4">{role === "Admin" ? row.permission : row.workload}</td>
                    <td className="px-5 py-4">{row.health}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

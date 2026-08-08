"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Transactions", href: "/transactions" },
  { name: "Reconciliation", href: "/reconciliation" },
  { name: "Exceptions", href: "/exceptions" },
  { name: "Risk Monitoring", href: "/risk" },
  { name: "Compliance", href: "/compliance" },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 shrink-0 bg-slate-950 p-6 text-white">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            PayFlow Control
          </h1>

          <p className="mt-1 text-xs text-slate-400">
            Payment Operations SaaS
          </p>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 border-t border-slate-800 pt-5">
          <p className="text-xs text-slate-500">
            Independent Product Development Portfolio
          </p>

          <p className="mt-1 text-xs text-slate-500">
            2026
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="min-w-0 flex-1">
        <header className="border-b bg-white px-8 py-5">
          <h1 className="text-xl font-semibold text-slate-900">
            Payment Operations Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Payment operations, risk and reconciliation
          </p>
        </header>

        <main className="min-h-screen bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
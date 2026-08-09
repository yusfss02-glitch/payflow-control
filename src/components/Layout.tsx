"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Transactions",
    href: "/transactions",
  },
  {
    name: "Reconciliation",
    href: "/reconciliation",
  },
  {
    name: "Exceptions",
    href: "/exceptions",
  },
  {
    name: "Risk Monitoring",
    href: "/risk",
  },
  {
    name: "Compliance",
    href: "/compliance",
  },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* SIDEBAR */}

      <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800 bg-slate-950">

        {/* BRAND */}

        <div className="border-b border-slate-800 px-6 py-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950 shadow-sm">
              PC
            </div>

            <div>
              <h1 className="text-base font-semibold tracking-tight text-white">
                PayFlow Control
              </h1>

              <p className="mt-0.5 text-xs text-slate-400">
                Payment Operations SaaS
              </p>
            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 px-4 py-6">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Workspace
          </p>

          <div className="space-y-1">

            {navigation.map((item) => {

              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`}
                >

                  <span
                    className={`mr-3 h-1.5 w-1.5 rounded-full transition ${
                      isActive
                        ? "bg-slate-950"
                        : "bg-slate-600 group-hover:bg-slate-300"
                    }`}
                  />

                  {item.name}

                </Link>
              );

            })}

          </div>

        </nav>

        {/* FOOTER */}

        <div className="px-5 pb-6">

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4 text-center">

            <p className="text-[11px] font-medium text-slate-400">
              Independent Product Development Portfolio
            </p>

          </div>

        </div>

      </aside>

      {/* MAIN AREA */}

      <div className="ml-64 min-h-screen">

        {/* TOP HEADER */}

        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 px-8 py-4 backdrop-blur">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Payment Operations
              </p>

              <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900">
                Control Center
              </h2>

            </div>

            <div className="flex items-center gap-3">

              <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 sm:block">
                Demo Environment
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                PC
              </div>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-8 py-8">

          <div className="mx-auto w-full max-w-[1500px]">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}
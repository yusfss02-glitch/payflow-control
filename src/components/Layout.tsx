"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AIAssistant from "./ai/AIAssistant";

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

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isAIExpanded, setIsAIExpanded] = useState(false);

  function openAI() {
    setIsAIOpen(true);
    setIsAIExpanded(false);
  }

  function closeAI() {
    setIsAIOpen(false);
    setIsAIExpanded(false);
  }

  function expandAI() {
    setIsAIExpanded(true);
  }

  function collapseAI() {
    setIsAIExpanded(false);
  }

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

          {/* PRODUCT DOCUMENTATION */}

          <div className="mt-6 border-t border-slate-800 pt-5">

            <a
              href="https://drive.google.com/drive/folders/1HLaQHOFn0o80Z26RMMZvK3gLcBHeBguV?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-150 hover:bg-slate-900 hover:text-white"
            >

              <span className="mr-3 flex h-1.5 w-1.5 items-center justify-center">

                <span className="h-1.5 w-1.5 rounded-full bg-slate-600 transition group-hover:bg-slate-300" />

              </span>

              View Product Documentation

            </a>

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

              {/* AI ASSISTANT */}

              <button
                type="button"
                onClick={openAI}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isAIOpen
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                }`}
                aria-label="Open PayFlow AI Assistant"
                title="Open PayFlow AI Assistant"
              >

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z"
                    fill="currentColor"
                  />

                  <path
                    d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2L19 15Z"
                    fill="currentColor"
                  />
                </svg>

                AI Assistant

              </button>

              {/* DEMO ENVIRONMENT */}

              <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 sm:block">
                Demo Environment
              </div>

              {/* PROFILE */}

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

      {/* AI ASSISTANT PANEL */}

      {isAIOpen && (
        <div
          className={
            isAIExpanded
              ? "fixed inset-0 z-[100]"
              : "fixed inset-y-0 right-0 z-[100] w-full lg:w-1/3"
          }
        >

          <AIAssistant
            onClose={closeAI}
            onExpand={expandAI}
          />

          {/* COLLAPSE BUTTON */}

          {isAIExpanded && (
            <button
              type="button"
              onClick={collapseAI}
              aria-label="Collapse AI Assistant"
              title="Exit full screen"
              className="fixed right-16 top-4 z-[110] flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >

                <path d="M9 3H3v6" />
                <path d="M3 3l7 7" />
                <path d="M15 21h6v-6" />
                <path d="M21 21l-7-7" />

              </svg>

            </button>
          )}

        </div>
      )}

    </div>
  );
}
import Link from "next/link";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold">PayFlow Control</h2>

        <nav className="mt-8 space-y-3">
          <Link href="/dashboard" className="block hover:text-cyan-300">
            Dashboard
          </Link>

          <Link href="/transactions" className="block hover:text-cyan-300">
            Transactions
          </Link>

          <Link href="/reconciliation" className="block hover:text-cyan-300">
            Reconciliation
          </Link>

          <Link href="/exceptions" className="block hover:text-cyan-300">
            Exceptions
          </Link>

          <Link href="/risk" className="block hover:text-cyan-300">
            Risk Monitoring
          </Link>

          <Link href="/compliance" className="block hover:text-cyan-300">
            Compliance
          </Link>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="border-b bg-white p-5">
          <h1 className="text-xl font-semibold">
            Payment Operations Dashboard
          </h1>
        </header>

        <main className="min-h-screen bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
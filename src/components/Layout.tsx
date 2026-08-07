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
          <p>Dashboard</p>
          <p>Transactions</p>
          <p>Reconciliation</p>
          <p>Exceptions</p>
          <p>Risk Monitoring</p>
          <p>Compliance</p>
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
import Link from "next/link";

const transactions = [
  {
    id: "TXN001",
    merchant: "Hotel A",
    amount: "$1,250",
    status: "Completed",
  },
  {
    id: "TXN002",
    merchant: "Hotel B",
    amount: "$980",
    status: "Pending",
  },
  {
    id: "TXN003",
    merchant: "Hotel C",
    amount: "$2,430",
    status: "Failed",
  },
  {
    id: "TXN004",
    merchant: "Hotel D",
    amount: "$750",
    status: "Completed",
  },
  {
    id: "TXN005",
    merchant: "Hotel E",
    amount: "$1,890",
    status: "Completed",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="mt-1 text-gray-500">
          Overview of payment operations, reconciliation,
          exceptions and risk.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Transactions Today
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            12,458
          </p>

          <p className="mt-2 text-sm text-green-600">
            +8.4% vs yesterday
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Settlement Success
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            98.7%
          </p>

          <p className="mt-2 text-sm text-green-600">
            Above target
          </p>
        </div>

        <Link
          href="/exceptions"
          className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-sm text-gray-500">
            Open Exceptions
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            2
          </p>

          <p className="mt-2 text-sm text-red-600">
            Requires attention
          </p>
        </Link>

        <Link
          href="/risk"
          className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-sm text-gray-500">
            High Risk Alerts
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            2
          </p>

          <p className="mt-2 text-sm text-red-600">
            Review required
          </p>
        </Link>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-3 gap-6">
        {/* RECENT TRANSACTIONS */}
        <div className="col-span-2 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Recent Transactions
              </h3>

              <p className="text-sm text-gray-500">
                Latest payment activity
              </p>
            </div>

            <Link
              href="/transactions"
              className="text-sm font-medium text-slate-700 hover:text-slate-950"
            >
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="pb-3">Transaction</th>
                  <th className="pb-3">Merchant</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 font-medium">
                      {transaction.id}
                    </td>

                    <td>{transaction.merchant}</td>

                    <td>{transaction.amount}</td>

                    <td>
                      {transaction.status ===
                        "Completed" && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Completed
                        </span>
                      )}

                      {transaction.status ===
                        "Pending" && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Pending
                        </span>
                      )}

                      {transaction.status ===
                        "Failed" && (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Failed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* OPERATIONAL SUMMARY */}
        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Exceptions
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Items requiring attention
                </p>
              </div>

              <Link
                href="/exceptions"
                className="text-sm font-medium text-slate-700"
              >
                View →
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Open
                </span>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  2
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Under Review
                </span>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  0
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Resolved
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  1
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Risk Alerts
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Current risk exposure
                </p>
              </div>

              <Link
                href="/risk"
                className="text-sm font-medium text-slate-700"
              >
                View →
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  High Risk
                </span>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  2
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Medium Risk
                </span>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  1
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Low Risk
                </span>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECONCILIATION SUMMARY */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Reconciliation Health
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Current payment matching status
            </p>
          </div>

          <Link
            href="/reconciliation"
            className="text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            Open reconciliation →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">
              Matched
            </p>

            <p className="mt-1 text-2xl font-bold">
              2
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Unmatched
            </p>

            <p className="mt-1 text-2xl font-bold text-red-600">
              2
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Under Review
            </p>

            <p className="mt-1 text-2xl font-bold text-yellow-600">
              1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
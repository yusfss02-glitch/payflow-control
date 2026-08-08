import Link from "next/link";
import Layout from "@/components/Layout";

const records = {
  REC001: {
    id: "REC001",
    transaction: "TXN001",
    merchant: "Hotel A",
    amount: "$1,250",
    status: "Matched",
    paymentProvider: "Stripe",
    settlementAmount: "$1,250",
    settlementDate: "Aug 8, 2026",
    difference: "$0",
  },
  REC002: {
    id: "REC002",
    transaction: "TXN002",
    merchant: "Hotel B",
    amount: "$980",
    status: "Under Review",
    paymentProvider: "Midtrans",
    settlementAmount: "$950",
    settlementDate: "Aug 8, 2026",
    difference: "$30",
  },
  REC003: {
    id: "REC003",
    transaction: "TXN003",
    merchant: "Hotel C",
    amount: "$2,430",
    status: "Unmatched",
    paymentProvider: "Stripe",
    settlementAmount: "$0",
    settlementDate: "Not Settled",
    difference: "$2,430",
  },
  REC004: {
    id: "REC004",
    transaction: "TXN004",
    merchant: "Hotel D",
    amount: "$750",
    status: "Matched",
    paymentProvider: "Xendit",
    settlementAmount: "$750",
    settlementDate: "Aug 8, 2026",
    difference: "$0",
  },
  REC005: {
    id: "REC005",
    transaction: "TXN005",
    merchant: "Hotel E",
    amount: "$1,890",
    status: "Unmatched",
    paymentProvider: "Stripe",
    settlementAmount: "$1,850",
    settlementDate: "Aug 8, 2026",
    difference: "$40",
  },
};

type RecordId = keyof typeof records;

export default async function ReconciliationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const record = records[id as RecordId];

  if (!record) {
    return (
      <Layout>
        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">
            Reconciliation Record Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            The requested reconciliation record does not exist.
          </p>

          <Link
            href="/reconciliation"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Reconciliation
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <Link
            href="/reconciliation"
            className="text-sm text-gray-500 hover:text-slate-900"
          >
            ← Back to Reconciliation
          </Link>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {record.id}
              </h2>

              <p className="mt-1 text-gray-500">
                Reconciliation record and settlement details.
              </p>
            </div>

            {record.status === "Matched" && (
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Matched
              </span>
            )}

            {record.status === "Under Review" && (
              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                Under Review
              </span>
            )}

            {record.status === "Unmatched" && (
              <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                Unmatched
              </span>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Transaction Amount
            </p>

            <p className="mt-2 text-2xl font-bold">
              {record.amount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Settlement Amount
            </p>

            <p className="mt-2 text-2xl font-bold">
              {record.settlementAmount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Difference
            </p>

            <p
              className={`mt-2 text-2xl font-bold ${
                record.difference === "$0"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {record.difference}
            </p>
          </div>

        </div>

        {/* DETAILS */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Reconciliation Details
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Record ID
              </p>

              <p className="mt-1 font-medium">
                {record.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Transaction
              </p>

              <Link
                href={`/transactions/${record.transaction}`}
                className="mt-1 inline-block font-medium text-blue-600 hover:underline"
              >
                {record.transaction}
              </Link>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Merchant
              </p>

              <p className="mt-1 font-medium">
                {record.merchant}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Payment Provider
              </p>

              <p className="mt-1 font-medium">
                {record.paymentProvider}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Settlement Date
              </p>

              <p className="mt-1 font-medium">
                {record.settlementDate}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Reconciliation Status
              </p>

              <p className="mt-1 font-medium">
                {record.status}
              </p>
            </div>

          </div>
        </div>

        {/* OPERATIONAL ACTIONS */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Operational Actions
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Continue investigation through related payment operations.
          </p>

          <div className="mt-5 flex gap-3">

            <Link
              href={`/transactions/${record.transaction}`}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              View Transaction
            </Link>

            <Link
              href="/exceptions"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              View Exceptions
            </Link>

            <Link
              href="/risk"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              View Risk
            </Link>

          </div>
        </div>

      </div>
    </Layout>
  );
}
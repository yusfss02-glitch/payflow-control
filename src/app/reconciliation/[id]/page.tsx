"use client";

import { use } from "react";
import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const reconciliationData = {
  REC001: {
    id: "REC001",
    transaction: "TXN001",
    merchant: "Hotel A",
    amount: "$1,250",
    paymentProvider: "Stripe",
    settlementAmount: "$1,250",
    difference: "$0",
    status: "Matched",
    reason: "Transaction amount successfully matched with settlement record.",
  },
  REC002: {
    id: "REC002",
    transaction: "TXN002",
    merchant: "Hotel B",
    amount: "$980",
    paymentProvider: "Midtrans",
    settlementAmount: "$960",
    difference: "$20",
    status: "Under Review",
    reason: "Settlement amount differs from the original transaction amount.",
  },
  REC003: {
    id: "REC003",
    transaction: "TXN003",
    merchant: "Hotel C",
    amount: "$2,430",
    paymentProvider: "Stripe",
    settlementAmount: "$2,100",
    difference: "$330",
    status: "Unmatched",
    reason: "Settlement record could not be matched with the transaction.",
  },
  REC004: {
    id: "REC004",
    transaction: "TXN004",
    merchant: "Hotel D",
    amount: "$750",
    paymentProvider: "Xendit",
    settlementAmount: "$750",
    difference: "$0",
    status: "Matched",
    reason: "Transaction amount successfully matched with settlement record.",
  },
  REC005: {
    id: "REC005",
    transaction: "TXN005",
    merchant: "Hotel E",
    amount: "$1,890",
    paymentProvider: "Stripe",
    settlementAmount: "$1,700",
    difference: "$190",
    status: "Unmatched",
    reason: "Settlement record requires investigation before matching.",
  },
};

export default function ReconciliationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const record =
    reconciliationData[
      id as keyof typeof reconciliationData
    ];

  const [status, setStatus] = useState(
    record?.status || "Unmatched"
  );

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
                Reconciliation matching and settlement investigation.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                status === "Matched"
                  ? "bg-green-100 text-green-700"
                  : status === "Under Review"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* WORKFLOW */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Matching Workflow
          </h3>

          <div className="mt-6 grid grid-cols-3 gap-4">

            <button
              onClick={() => setStatus("Unmatched")}
              className={`rounded-lg border p-4 text-left ${
                status === "Unmatched"
                  ? "border-red-400 bg-red-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                1. Unmatched
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Settlement record requires investigation.
              </p>
            </button>

            <button
              onClick={() => setStatus("Under Review")}
              className={`rounded-lg border p-4 text-left ${
                status === "Under Review"
                  ? "border-yellow-400 bg-yellow-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                2. Under Review
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Operations team is reviewing the discrepancy.
              </p>
            </button>

            <button
              onClick={() => setStatus("Matched")}
              className={`rounded-lg border p-4 text-left ${
                status === "Matched"
                  ? "border-green-400 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                3. Matched
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Transaction and settlement have been matched.
              </p>
            </button>

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
                Merchant
              </p>

              <p className="mt-1 font-medium">
                {record.merchant}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Related Transaction
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
                Payment Provider
              </p>

              <p className="mt-1 font-medium">
                {record.paymentProvider}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Current Status
              </p>

              <p className="mt-1 font-medium">
                {status}
              </p>
            </div>

          </div>

          <div className="mt-6 border-t pt-6">
            <p className="text-sm text-gray-500">
              Reconciliation Assessment
            </p>

            <p className="mt-2">
              {record.reason}
            </p>
          </div>
        </div>

        {/* RELATED OPERATIONS */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Related Operations
          </h3>

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
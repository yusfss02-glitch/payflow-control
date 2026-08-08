"use client";

import { use } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const reconciliationData = {
  REC001: {
    id: "REC001",
    transaction: "TXN001",
    merchant: "Hotel A",
    amount: "$1,250",
    expectedAmount: "$1,250",
    difference: "$0",
    provider: "Stripe",
  },
  REC002: {
    id: "REC002",
    transaction: "TXN002",
    merchant: "Hotel B",
    amount: "$980",
    expectedAmount: "$980",
    difference: "$0",
    provider: "Midtrans",
  },
  REC003: {
    id: "REC003",
    transaction: "TXN003",
    merchant: "Hotel C",
    amount: "$2,430",
    expectedAmount: "$2,400",
    difference: "$30",
    provider: "Stripe",
  },
  REC004: {
    id: "REC004",
    transaction: "TXN004",
    merchant: "Hotel D",
    amount: "$750",
    expectedAmount: "$750",
    difference: "$0",
    provider: "Xendit",
  },
  REC005: {
    id: "REC005",
    transaction: "TXN005",
    merchant: "Hotel E",
    amount: "$1,890",
    expectedAmount: "$1,850",
    difference: "$40",
    provider: "Stripe",
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

  const {
    reconciliationStatuses,
    updateReconciliationStatus,
  } = useWorkflow();

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

  const status =
    reconciliationStatuses[record.id] ||
    "Unmatched";

  return (
    <Layout>
      <div className="space-y-6">

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
                Reconciliation matching and settlement review.
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

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Matching Workflow
          </h3>

          <div className="mt-6 grid grid-cols-3 gap-4">

            <button
              onClick={() =>
                updateReconciliationStatus(
                  record.id,
                  "Unmatched"
                )
              }
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
                Record requires reconciliation review.
              </p>
            </button>

            <button
              onClick={() =>
                updateReconciliationStatus(
                  record.id,
                  "Under Review"
                )
              }
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
                Operations team is validating the record.
              </p>
            </button>

            <button
              onClick={() =>
                updateReconciliationStatus(
                  record.id,
                  "Matched"
                )
              }
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
              Expected Settlement
            </p>

            <p className="mt-2 text-2xl font-bold">
              {record.expectedAmount}
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
                Payment Provider
              </p>

              <p className="mt-1 font-medium">
                {record.provider}
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

        </div>

      </div>
    </Layout>
  );
}
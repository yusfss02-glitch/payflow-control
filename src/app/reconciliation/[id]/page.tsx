"use client";

import { use } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const recordData = {
  REC001: {
    id: "REC001",
    transaction: "TXN001",
    merchant: "StayBook",
    amount: "$1,250",
  },
  REC002: {
    id: "REC002",
    transaction: "TXN002",
    merchant: "TripNest",
    amount: "$980",
  },
  REC003: {
    id: "REC003",
    transaction: "TXN003",
    merchant: "RoomLink",
    amount: "$2,430",
  },
  REC004: {
    id: "REC004",
    transaction: "TXN004",
    merchant: "TravelHub",
    amount: "$750",
  },
  REC005: {
    id: "REC005",
    transaction: "TXN005",
    merchant: "BookStay",
    amount: "$1,890",
  },
};

export default function ReconciliationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const record =
    recordData[id as keyof typeof recordData];

  const {
    reconciliationStatuses,
    updateReconciliationStatus,
  } = useWorkflow();

  if (!record) {
    return (
      <Layout>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">
            Record Not Found
          </h2>

          <p className="text-gray-500">
            The requested reconciliation record does not exist.
          </p>

          <Link
            href="/reconciliation"
            className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
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

        {/* BACK */}
        <div>
          <Link
            href="/reconciliation"
            className="text-sm text-gray-500 hover:text-slate-900"
          >
            ← Back to Reconciliation
          </Link>
        </div>

        {/* HEADER */}
        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              {record.id}
            </h2>

            <p className="mt-1 text-gray-500">
              Reconciliation record and matching workflow.
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

        {/* WORKFLOW */}
        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Reconciliation Workflow
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
                Transaction has not yet been matched with its settlement record.
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
                Operations team is reviewing the reconciliation difference.
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
                Transaction and settlement records have been successfully matched.
              </p>
            </button>

          </div>

        </div>

        {/* RECORD SUMMARY */}
        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Transaction
            </p>

            <Link
              href={`/transactions/${record.transaction}`}
              className="mt-2 inline-block font-semibold text-blue-600 hover:underline"
            >
              {record.transaction}
            </Link>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Platform / Channel
            </p>

            <p className="mt-2 font-semibold">
              {record.merchant}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Amount
            </p>

            <p className="mt-2 text-2xl font-bold">
              {record.amount}
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
                Transaction ID
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
                Platform / Channel
              </p>

              <p className="mt-1 font-medium">
                {record.merchant}
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
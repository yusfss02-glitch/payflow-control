"use client";

import { use } from "react";
import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const exceptionData = {
  EXC001: {
    id: "EXC001",
    transaction: "TXN003",
    merchant: "Hotel C",
    type: "Settlement Failure",
    amount: "$2,430",
    description:
      "Settlement amount does not match the expected transaction amount.",
    priority: "High",
  },
  EXC002: {
    id: "EXC002",
    transaction: "TXN006",
    merchant: "Hotel F",
    type: "Payment Exception",
    amount: "$560",
    description:
      "Payment transaction requires manual operational review.",
    priority: "Medium",
  },
  EXC003: {
    id: "EXC003",
    transaction: "TXN002",
    merchant: "Hotel B",
    type: "Reconciliation Difference",
    amount: "$980",
    description:
      "Settlement record contains a difference from the transaction amount.",
    priority: "Medium",
  },
};

export default function ExceptionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const exception =
    exceptionData[id as keyof typeof exceptionData];

  const [status, setStatus] = useState("Open");

  if (!exception) {
    return (
      <Layout>
        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">
            Exception Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            The requested exception does not exist.
          </p>

          <Link
            href="/exceptions"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Exceptions
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <Link
            href="/exceptions"
            className="text-sm text-gray-500 hover:text-slate-900"
          >
            ← Back to Exceptions
          </Link>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {exception.id}
              </h2>

              <p className="mt-1 text-gray-500">
                Exception investigation and resolution workflow.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                status === "Open"
                  ? "bg-red-100 text-red-700"
                  : status === "Under Review"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Exception Workflow
          </h3>

          <div className="mt-6 grid grid-cols-3 gap-4">

            <button
              onClick={() => setStatus("Open")}
              className={`rounded-lg border p-4 text-left ${
                status === "Open"
                  ? "border-red-400 bg-red-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                1. Open
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Exception identified and awaiting investigation.
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
                Operations team is investigating the issue.
              </p>
            </button>

            <button
              onClick={() => setStatus("Resolved")}
              className={`rounded-lg border p-4 text-left ${
                status === "Resolved"
                  ? "border-green-400 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                3. Resolved
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Exception has been investigated and resolved.
              </p>
            </button>

          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Exception Type
            </p>

            <p className="mt-2 font-semibold">
              {exception.type}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Amount
            </p>

            <p className="mt-2 text-2xl font-bold">
              {exception.amount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Priority
            </p>

            <p className="mt-2 font-semibold text-red-600">
              {exception.priority}
            </p>
          </div>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Exception Details
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Exception ID
              </p>

              <p className="mt-1 font-medium">
                {exception.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Merchant
              </p>

              <p className="mt-1 font-medium">
                {exception.merchant}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Related Transaction
              </p>

              <Link
                href={`/transactions/${exception.transaction}`}
                className="mt-1 inline-block font-medium text-blue-600 hover:underline"
              >
                {exception.transaction}
              </Link>
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
              Description
            </p>

            <p className="mt-2">
              {exception.description}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Related Operations
          </h3>

          <div className="mt-5 flex gap-3">

            <Link
              href={`/transactions/${exception.transaction}`}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              View Transaction
            </Link>

            <Link
              href="/reconciliation"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              View Reconciliation
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
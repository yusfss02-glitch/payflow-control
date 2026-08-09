"use client";

import { use } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const transactions = {
  TXN001: {
    id: "TXN001",
    merchant: "Hotel A",
    amount: "$1,250",
    status: "Success",
    method: "Card",
    provider: "Stripe",
    transactionDate: "April 1, 2026",
    createdAt: "April 1, 2026 09:42",
    settlement: "Settled",
    risk: "Low",
  },

  TXN002: {
    id: "TXN002",
    merchant: "Hotel B",
    amount: "$980",
    status: "Pending",
    method: "Bank Transfer",
    provider: "Midtrans",
    transactionDate: "April 2, 2026",
    createdAt: "April 2, 2026 10:15",
    settlement: "Pending",
    risk: "Medium",
  },

  TXN003: {
    id: "TXN003",
    merchant: "Hotel C",
    amount: "$2,430",
    status: "Exception",
    method: "Card",
    provider: "Stripe",
    transactionDate: "April 3, 2026",
    createdAt: "April 3, 2026 10:28",
    settlement: "Not Settled",
    risk: "High",
  },

  TXN004: {
    id: "TXN004",
    merchant: "Hotel D",
    amount: "$750",
    status: "Success",
    method: "QR Payment",
    provider: "Xendit",
    transactionDate: "April 4, 2026",
    createdAt: "April 4, 2026 11:02",
    settlement: "Settled",
    risk: "Low",
  },

  TXN005: {
    id: "TXN005",
    merchant: "Hotel E",
    amount: "$1,890",
    status: "Success",
    method: "Card",
    provider: "Stripe",
    transactionDate: "April 5, 2026",
    createdAt: "April 5, 2026 11:35",
    settlement: "Settled",
    risk: "Low",
  },

  TXN006: {
    id: "TXN006",
    merchant: "Hotel F",
    amount: "$560",
    status: "Exception",
    method: "Bank Transfer",
    provider: "Midtrans",
    transactionDate: "April 6, 2026",
    createdAt: "April 6, 2026 11:48",
    settlement: "Not Settled",
    risk: "High",
  },
};

type TransactionId = keyof typeof transactions;

export default function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const transaction =
    transactions[id as TransactionId];

  const {
    transactionStatuses,
    updateTransactionStatus,
  } = useWorkflow();

  if (!transaction) {
    return (
      <Layout>
        <div className="space-y-4">

          <h2 className="text-2xl font-bold">
            Transaction Not Found
          </h2>

          <p className="text-gray-500">
            The requested transaction does not exist.
          </p>

          <Link
            href="/transactions"
            className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Transactions
          </Link>

        </div>
      </Layout>
    );
  }

  const currentStatus =
    transactionStatuses[transaction.id] ||
    transaction.status;

  return (
    <Layout>

      <div className="space-y-6">

        {/* HEADER */}

        <div>

          <Link
            href="/transactions"
            className="text-sm text-gray-500 hover:text-slate-900"
          >
            ← Back to Transactions
          </Link>

          <div className="mt-3 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold">
                {transaction.id}
              </h2>

              <p className="mt-1 text-gray-500">
                Transaction detail and operational information.
              </p>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                currentStatus === "Success"
                  ? "bg-green-100 text-green-700"
                  : currentStatus === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {currentStatus}
            </span>

          </div>

        </div>

        {/* STATUS WORKFLOW */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Transaction Status
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Update the operational status of this transaction.
          </p>

          <div className="mt-5 flex gap-3">

            <button
              onClick={() =>
                updateTransactionStatus(
                  transaction.id,
                  "Success"
                )
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                currentStatus === "Success"
                  ? "bg-green-600 text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              Success
            </button>

            <button
              onClick={() =>
                updateTransactionStatus(
                  transaction.id,
                  "Pending"
                )
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                currentStatus === "Pending"
                  ? "bg-yellow-500 text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              Pending
            </button>

            <button
              onClick={() =>
                updateTransactionStatus(
                  transaction.id,
                  "Exception"
                )
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                currentStatus === "Exception"
                  ? "bg-red-600 text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              Exception
            </button>

          </div>

        </div>

        {/* SUMMARY */}

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">

            <p className="text-sm text-gray-500">
              Amount
            </p>

            <p className="mt-2 text-2xl font-bold">
              {transaction.amount}
            </p>

          </div>

          <div className="rounded-xl bg-white p-5 shadow">

            <p className="text-sm text-gray-500">
              Settlement
            </p>

            <p className="mt-2 text-lg font-semibold">
              {transaction.settlement}
            </p>

          </div>

          <div className="rounded-xl bg-white p-5 shadow">

            <p className="text-sm text-gray-500">
              Risk Level
            </p>

            <p
              className={`mt-2 text-lg font-semibold ${
                transaction.risk === "High"
                  ? "text-red-600"
                  : transaction.risk === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {transaction.risk}
            </p>

          </div>

        </div>

        {/* TRANSACTION DETAILS */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Transaction Details
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-6">

            <div>

              <p className="text-sm text-gray-500">
                Transaction ID
              </p>

              <p className="mt-1 font-medium">
                {transaction.id}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Transaction Date
              </p>

              <p className="mt-1 font-medium">
                {transaction.transactionDate}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Merchant
              </p>

              <p className="mt-1 font-medium">
                {transaction.merchant}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Payment Method
              </p>

              <p className="mt-1 font-medium">
                {transaction.method}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Payment Provider
              </p>

              <p className="mt-1 font-medium">
                {transaction.provider}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Created At
              </p>

              <p className="mt-1 font-medium">
                {transaction.createdAt}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Current Status
              </p>

              <p className="mt-1 font-medium">
                {currentStatus}
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
              href="/reconciliation"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Reconciliation
            </Link>

            <Link
              href="/risk"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Risk Monitoring
            </Link>

            <Link
              href="/exceptions"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Exceptions
            </Link>

          </div>

        </div>

      </div>

    </Layout>
  );
}
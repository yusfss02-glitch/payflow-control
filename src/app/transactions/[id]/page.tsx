"use client";

import { use } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const transactions = {
  TXN001: {
    id: "TXN001",
    merchant: "StayBook",
    amount: "$1,250",
    status: "Success",
    method: "Card",
    transactionDate: "April 1, 2026",
  },
  TXN002: {
    id: "TXN002",
    merchant: "TripNest",
    amount: "$980",
    status: "Pending",
    method: "Bank Transfer",
    transactionDate: "April 2, 2026",
  },
  TXN003: {
    id: "TXN003",
    merchant: "RoomLink",
    amount: "$2,430",
    status: "Exception",
    method: "Card",
    transactionDate: "April 3, 2026",
  },
  TXN004: {
    id: "TXN004",
    merchant: "TravelHub",
    amount: "$750",
    status: "Success",
    method: "QR Payment",
    transactionDate: "April 4, 2026",
  },
  TXN005: {
    id: "TXN005",
    merchant: "BookStay",
    amount: "$1,890",
    status: "Success",
    method: "Card",
    transactionDate: "April 5, 2026",
  },
  TXN006: {
    id: "TXN006",
    merchant: "InnFinder",
    amount: "$560",
    status: "Exception",
    method: "Bank Transfer",
    transactionDate: "April 6, 2026",
  },
};

export default function TransactionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const transaction =
    transactions[
      id as keyof typeof transactions
    ];

  const {
    transactionStatuses,
  } = useWorkflow();

  if (!transaction) {
    return (
      <Layout>
        <div className="space-y-6">

          <h2 className="text-3xl font-bold">
            Transaction Not Found
          </h2>

          <p className="text-gray-500">
            The requested transaction does not exist.
          </p>

          <Link
            href="/transactions"
            className="text-sm text-gray-500 hover:text-slate-900"
          >
            ← Back to Transactions
          </Link>

        </div>
      </Layout>
    );
  }

  const status =
    transactionStatuses[transaction.id] ||
    transaction.status;

  return (
    <Layout>
      <div className="space-y-6">

        {/* BACK */}

        <div>
          <Link
            href="/transactions"
            className="text-sm text-gray-500 hover:text-slate-900"
          >
            ← Back to Transactions
          </Link>
        </div>

        {/* HEADER */}

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              {transaction.id}
            </h2>

            <p className="mt-1 text-gray-500">
              Transaction details and payment information.
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              status === "Success"
                ? "bg-green-100 text-green-700"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>

        </div>

        {/* SUMMARY */}

        <div className="grid grid-cols-4 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Transaction Date
            </p>

            <p className="mt-2 font-semibold">
              {transaction.transactionDate}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Platform / Channel
            </p>

            <p className="mt-2 font-semibold">
              {transaction.merchant}
            </p>
          </div>

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
              Payment Method
            </p>

            <p className="mt-2 font-semibold">
              {transaction.method}
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
                Platform / Channel
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
                Amount
              </p>

              <p className="mt-1 font-medium">
                {transaction.amount}
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
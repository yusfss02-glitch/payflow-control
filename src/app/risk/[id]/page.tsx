"use client";

import { use } from "react";
import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const riskData = {
  RISK001: {
    id: "RISK001",
    transaction: "TXN003",
    merchant: "Hotel C",
    score: 87,
    level: "High",
    type: "Transaction Risk",
    reason: "Unusual transaction amount and settlement anomaly detected.",
  },
  RISK002: {
    id: "RISK002",
    transaction: "TXN006",
    merchant: "Hotel F",
    score: 72,
    level: "Medium",
    type: "Payment Risk",
    reason: "Payment pattern requires additional operational review.",
  },
  RISK003: {
    id: "RISK003",
    transaction: "TXN002",
    merchant: "Hotel B",
    score: 54,
    level: "Medium",
    type: "Settlement Risk",
    reason: "Settlement difference detected during reconciliation.",
  },
};

export default function RiskDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const risk = riskData[id as keyof typeof riskData];

  const [status, setStatus] = useState("Detected");

  if (!risk) {
    return (
      <Layout>
        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">
            Risk Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            The requested risk record does not exist.
          </p>

          <Link
            href="/risk"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Risk Monitoring
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
            href="/risk"
            className="text-sm text-gray-500 hover:text-slate-900"
          >
            ← Back to Risk Monitoring
          </Link>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {risk.id}
              </h2>

              <p className="mt-1 text-gray-500">
                Risk assessment and mitigation workflow.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                status === "Detected"
                  ? "bg-red-100 text-red-700"
                  : status === "Reviewing"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* WORKFLOW */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Risk Workflow
          </h3>

          <div className="mt-6 grid grid-cols-3 gap-4">

            <button
              onClick={() => setStatus("Detected")}
              className={`rounded-lg border p-4 text-left ${
                status === "Detected"
                  ? "border-red-400 bg-red-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                1. Detected
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Risk signal has been detected.
              </p>
            </button>

            <button
              onClick={() => setStatus("Reviewing")}
              className={`rounded-lg border p-4 text-left ${
                status === "Reviewing"
                  ? "border-yellow-400 bg-yellow-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                2. Reviewing
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Risk is being investigated.
              </p>
            </button>

            <button
              onClick={() => setStatus("Mitigated")}
              className={`rounded-lg border p-4 text-left ${
                status === "Mitigated"
                  ? "border-green-400 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                3. Mitigated
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Risk has been addressed.
              </p>
            </button>

          </div>
        </div>

        {/* RISK SUMMARY */}
        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Risk Score
            </p>

            <p className="mt-2 text-3xl font-bold">
              {risk.score}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Risk Level
            </p>

            <p
              className={`mt-2 text-xl font-bold ${
                risk.level === "High"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {risk.level}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Risk Type
            </p>

            <p className="mt-2 font-semibold">
              {risk.type}
            </p>
          </div>

        </div>

        {/* DETAILS */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Risk Details
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Risk ID
              </p>

              <p className="mt-1 font-medium">
                {risk.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Merchant
              </p>

              <p className="mt-1 font-medium">
                {risk.merchant}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Related Transaction
              </p>

              <Link
                href={`/transactions/${risk.transaction}`}
                className="mt-1 inline-block font-medium text-blue-600 hover:underline"
              >
                {risk.transaction}
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
              Risk Assessment
            </p>

            <p className="mt-2">
              {risk.reason}
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
              href={`/transactions/${risk.transaction}`}
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
              href="/reconciliation"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              View Reconciliation
            </Link>

          </div>
        </div>

      </div>
    </Layout>
  );
}
"use client";

import { use } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const riskData = {
  RISK001: {
    id: "RISK001",
    transaction: "TXN003",
    merchant: "Hotel C",
    riskType: "High Value Transaction",
    score: 92,
    provider: "Stripe",
    amount: "$2,430",
  },
  RISK002: {
    id: "RISK002",
    transaction: "TXN006",
    merchant: "Hotel F",
    riskType: "Unusual Payment Pattern",
    score: 84,
    provider: "Midtrans",
    amount: "$560",
  },
  RISK003: {
    id: "RISK003",
    transaction: "TXN002",
    merchant: "Hotel B",
    riskType: "Velocity Alert",
    score: 67,
    provider: "Midtrans",
    amount: "$980",
  },
};

export default function RiskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const risk = riskData[id as keyof typeof riskData];

  const {
    riskStatuses,
    updateRiskStatus,
  } = useWorkflow();

  if (!risk) {
    return (
      <Layout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">
              Risk Alert Not Found
            </h2>

            <p className="mt-2 text-gray-500">
              The requested risk alert does not exist.
            </p>

            <Link
              href="/risk"
              className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Back to Risk Monitoring
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const status = riskStatuses[risk.id] || "Open";

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
                Risk alert investigation and resolution.
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

        {/* WORKFLOW */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">
            Risk Workflow
          </h3>

          <div className="mt-6 grid grid-cols-3 gap-4">

            <button
              onClick={() =>
                updateRiskStatus(risk.id, "Open")
              }
              className={`rounded-lg border p-4 text-left transition ${
                status === "Open"
                  ? "border-red-400 bg-red-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                1. Open
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Risk alert requires investigation.
              </p>
            </button>

            <button
              onClick={() =>
                updateRiskStatus(
                  risk.id,
                  "Under Review"
                )
              }
              className={`rounded-lg border p-4 text-left transition ${
                status === "Under Review"
                  ? "border-yellow-400 bg-yellow-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                2. Under Review
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Risk investigation is in progress.
              </p>
            </button>

            <button
              onClick={() =>
                updateRiskStatus(
                  risk.id,
                  "Resolved"
                )
              }
              className={`rounded-lg border p-4 text-left transition ${
                status === "Resolved"
                  ? "border-green-400 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-semibold">
                3. Resolved
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Risk alert has been resolved.
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

            <p
              className={`mt-2 text-3xl font-bold ${
                risk.score >= 80
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {risk.score}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Transaction Amount
            </p>

            <p className="mt-2 text-2xl font-bold">
              {risk.amount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Provider
            </p>

            <p className="mt-2 text-lg font-semibold">
              {risk.provider}
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
                Risk Type
              </p>

              <p className="mt-1 font-medium">
                {risk.riskType}
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
                Transaction
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
        </div>

      </div>
    </Layout>
  );
}
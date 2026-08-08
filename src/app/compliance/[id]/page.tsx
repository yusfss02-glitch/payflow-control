"use client";

import { use } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const complianceData = {
  CMP001: {
    id: "CMP001",
    transaction: "TXN003",
    merchant: "Hotel C",
    type: "Transaction Monitoring",
    rule: "High-value transaction review",
    amount: "$2,430",
    priority: "High",
    description:
      "Transaction requires compliance review because the transaction value exceeded the configured monitoring threshold.",
  },
  CMP002: {
    id: "CMP002",
    transaction: "TXN006",
    merchant: "Hotel F",
    type: "Payment Monitoring",
    rule: "Unusual payment pattern",
    amount: "$560",
    priority: "Medium",
    description:
      "Payment activity requires additional review based on unusual transaction behavior.",
  },
  CMP003: {
    id: "CMP003",
    transaction: "TXN002",
    merchant: "Hotel B",
    type: "Settlement Monitoring",
    rule: "Settlement discrepancy review",
    amount: "$980",
    priority: "Medium",
    description:
      "Settlement discrepancy requires compliance verification before closure.",
  },
};

export default function ComplianceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const compliance =
    complianceData[id as keyof typeof complianceData];

  const {
    complianceStatuses,
    updateComplianceStatus,
  } = useWorkflow();

  if (!compliance) {
    return (
      <Layout>
        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">
            Compliance Record Not Found
          </h2>

          <Link
            href="/compliance"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Compliance
          </Link>
        </div>
      </Layout>
    );
  }

  const status =
    complianceStatuses[compliance.id] ||
    "Pending Review";

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <Link
            href="/compliance"
            className="text-sm text-gray-500 hover:text-slate-900"
          >
            ← Back to Compliance
          </Link>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {compliance.id}
              </h2>

              <p className="mt-1 text-gray-500">
                Compliance review and decision workflow.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                status === "Pending Review"
                  ? "bg-gray-100 text-gray-700"
                  : status === "Reviewing"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Compliance Workflow
          </h3>

          <div className="mt-6 grid grid-cols-4 gap-4">

            {[
              "Pending Review",
              "Reviewing",
              "Approved",
              "Rejected",
            ].map((workflowStatus, index) => (
              <button
                key={workflowStatus}
                onClick={() =>
                  updateComplianceStatus(
                    compliance.id,
                    workflowStatus
                  )
                }
                className={`rounded-lg border p-4 text-left ${
                  status === workflowStatus
                    ? "border-blue-400 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <p className="font-semibold">
                  {index + 1}. {workflowStatus}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {workflowStatus === "Pending Review"
                    ? "Case is awaiting review."
                    : workflowStatus === "Reviewing"
                    ? "Analyst is reviewing the case."
                    : workflowStatus === "Approved"
                    ? "Case has been approved."
                    : "Case has been rejected."}
                </p>
              </button>
            ))}

          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Compliance Type
            </p>

            <p className="mt-2 font-semibold">
              {compliance.type}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Amount
            </p>

            <p className="mt-2 text-2xl font-bold">
              {compliance.amount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Priority
            </p>

            <p className="mt-2 font-semibold text-red-600">
              {compliance.priority}
            </p>
          </div>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Compliance Details
          </h3>

          <div className="mt-6 grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Compliance ID
              </p>

              <p className="mt-1 font-medium">
                {compliance.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Merchant
              </p>

              <p className="mt-1 font-medium">
                {compliance.merchant}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Related Transaction
              </p>

              <Link
                href={`/transactions/${compliance.transaction}`}
                className="mt-1 inline-block font-medium text-blue-600 hover:underline"
              >
                {compliance.transaction}
              </Link>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Monitoring Rule
              </p>

              <p className="mt-1 font-medium">
                {compliance.rule}
              </p>
            </div>

          </div>

          <div className="mt-6 border-t pt-6">

            <p className="text-sm text-gray-500">
              Assessment
            </p>

            <p className="mt-2">
              {compliance.description}
            </p>

          </div>

        </div>

      </div>
    </Layout>
  );
}
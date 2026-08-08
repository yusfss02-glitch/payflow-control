"use client";

import { use } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const complianceRecords = {
  CMP001: {
    id: "CMP001",
    merchant: "Hotel A",
    requirement: "KYC Verification",
    risk: "Medium",
    description:
      "Merchant identity and business information require verification.",
  },

  CMP002: {
    id: "CMP002",
    merchant: "Hotel B",
    requirement: "Business Verification",
    risk: "Low",
    description:
      "Business registration and merchant information have been verified.",
  },

  CMP003: {
    id: "CMP003",
    merchant: "Hotel C",
    requirement: "Transaction Monitoring",
    risk: "High",
    description:
      "Transaction activity requires additional compliance review.",
  },

  CMP004: {
    id: "CMP004",
    merchant: "Hotel D",
    requirement: "KYC Verification",
    risk: "High",
    description:
      "Additional merchant verification is required.",
  },
};

type ComplianceId = keyof typeof complianceRecords;

export default function ComplianceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const record =
    complianceRecords[id as ComplianceId];

  const {
    complianceStatuses,
    updateComplianceStatus,
  } = useWorkflow();

  if (!record) {
    return (
      <Layout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">
              Compliance Record Not Found
            </h2>

            <p className="mt-2 text-gray-500">
              The requested compliance record does not exist.
            </p>

            <Link
              href="/compliance"
              className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Back to Compliance
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  /*
   * Default status:
   * CMP002 is already Approved.
   * All other records start as Pending Review.
   *
   * Once a status is changed through the workflow,
   * WorkflowContext becomes the source of truth.
   */
  const currentStatus =
    complianceStatuses[record.id] ||
    (record.id === "CMP002"
      ? "Approved"
      : "Pending Review");

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}
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
                {record.id}
              </h2>

              <p className="mt-1 text-gray-500">
                Compliance review and decision workflow.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                currentStatus === "Approved"
                  ? "bg-green-100 text-green-700"
                  : currentStatus === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {currentStatus}
            </span>

          </div>
        </div>

        {/* WORKFLOW */}
        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Compliance Decision
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Review the compliance record and update its decision.
          </p>

          <div className="mt-6 flex gap-3">

            {currentStatus === "Pending Review" && (
              <>
                <button
                  onClick={() =>
                    updateComplianceStatus(
                      record.id,
                      "Approved"
                    )
                  }
                  className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateComplianceStatus(
                      record.id,
                      "Rejected"
                    )
                  }
                  className="rounded-lg border border-red-300 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Reject
                </button>
              </>
            )}

            {currentStatus === "Approved" && (
              <button
                disabled
                className="cursor-not-allowed rounded-lg bg-gray-200 px-5 py-2 text-sm font-medium text-gray-500"
              >
                Approved
              </button>
            )}

            {currentStatus === "Rejected" && (
              <button
                disabled
                className="cursor-not-allowed rounded-lg bg-gray-200 px-5 py-2 text-sm font-medium text-gray-500"
              >
                Rejected
              </button>
            )}

          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Merchant
            </p>

            <p className="mt-2 text-lg font-semibold">
              {record.merchant}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Requirement
            </p>

            <p className="mt-2 text-lg font-semibold">
              {record.requirement}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Risk
            </p>

            <p
              className={`mt-2 text-lg font-semibold ${
                record.risk === "High"
                  ? "text-red-600"
                  : record.risk === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {record.risk}
            </p>
          </div>

        </div>

        {/* DETAILS */}
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
                Requirement
              </p>

              <p className="mt-1 font-medium">
                {record.requirement}
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

          <div className="mt-6 border-t pt-6">

            <p className="text-sm text-gray-500">
              Assessment
            </p>

            <p className="mt-2">
              {record.description}
            </p>

          </div>

        </div>

      </div>
    </Layout>
  );
}
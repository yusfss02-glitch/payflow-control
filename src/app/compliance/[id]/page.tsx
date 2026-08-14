"use client";

import { use } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const complianceData = {
  CMP001: {
    id: "CMP001",
    merchant: "StayBook",
    requirement: "KYC Verification",
    status: "Pending Review",
    risk: "Medium",
    description:
      "Merchant verification documents are pending operational review.",
  },
  CMP002: {
    id: "CMP002",
    merchant: "TripNest",
    requirement: "Business Verification",
    status: "Approved",
    risk: "Low",
    description:
      "Business verification has been completed and approved.",
  },
  CMP003: {
    id: "CMP003",
    merchant: "RoomLink",
    requirement: "Transaction Monitoring",
    status: "Pending Review",
    risk: "High",
    description:
      "Transaction monitoring controls require additional compliance review.",
  },
  CMP004: {
    id: "CMP004",
    merchant: "TravelHub",
    requirement: "KYC Verification",
    status: "Rejected",
    risk: "High",
    description:
      "The submitted verification information requires remediation before approval.",
  },
};

type ComplianceId = keyof typeof complianceData;

export default function ComplianceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const compliance =
    complianceData[id as ComplianceId];

  const {
    complianceStatuses,
    updateComplianceStatus,
  } = useWorkflow();

  if (!compliance) {
    return (
      <Layout>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Compliance Record Not Found
          </h2>

          <p className="text-gray-500">
            The requested compliance record does not exist.
          </p>

          <Link
            href="/compliance"
            className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Back to Compliance
          </Link>
        </div>
      </Layout>
    );
  }

  const currentStatus =
    complianceStatuses[compliance.id] ||
    compliance.status;

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
                {compliance.id}
              </h2>

              <p className="mt-1 text-gray-500">
                Compliance review and verification workflow.
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

        {/* REVIEW WORKFLOW */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-lg font-semibold">
            Compliance Review
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Review the compliance record and determine the appropriate outcome.
          </p>

          <div className="mt-5 flex gap-3">

            <button
              onClick={() =>
                updateComplianceStatus(
                  compliance.id,
                  "Pending Review"
                )
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                currentStatus === "Pending Review"
                  ? "bg-yellow-500 text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              Pending Review
            </button>

            <button
              onClick={() =>
                updateComplianceStatus(
                  compliance.id,
                  "Approved"
                )
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                currentStatus === "Approved"
                  ? "bg-green-600 text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              Approve
            </button>

            <button
              onClick={() =>
                updateComplianceStatus(
                  compliance.id,
                  "Rejected"
                )
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                currentStatus === "Rejected"
                  ? "bg-red-600 text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              Reject
            </button>

          </div>

        </div>

        {/* SUMMARY */}

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Requirement
            </p>

            <p className="mt-2 font-semibold">
              {compliance.requirement}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Platform / Channel
            </p>

            <p className="mt-2 font-semibold">
              {compliance.merchant}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Risk
            </p>

            <p
              className={`mt-2 font-semibold ${
                compliance.risk === "High"
                  ? "text-red-600"
                  : compliance.risk === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {compliance.risk}
            </p>
          </div>

        </div>

        {/* COMPLIANCE DETAILS */}

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
                Platform / Channel
              </p>

              <p className="mt-1 font-medium">
                {compliance.merchant}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Requirement
              </p>

              <p className="mt-1 font-medium">
                {compliance.requirement}
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
              Description
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
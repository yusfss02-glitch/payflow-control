"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const complianceRecords = [
  {
    id: "CMP001",
    merchant: "StayBook",
    requirement: "KYC Verification",
    status: "Pending Review",
    risk: "Medium",
  },
  {
    id: "CMP002",
    merchant: "TripNest",
    requirement: "Business Verification",
    status: "Approved",
    risk: "Low",
  },
  {
    id: "CMP003",
    merchant: "RoomLink",
    requirement: "Transaction Monitoring",
    status: "Pending Review",
    risk: "High",
  },
  {
    id: "CMP004",
    merchant: "TravelHub",
    requirement: "KYC Verification",
    status: "Rejected",
    risk: "High",
  },
];

export default function CompliancePage() {
  const [status, setStatus] = useState("All");

  const {
    complianceStatuses,
    updateComplianceStatus,
  } = useWorkflow();

  const filteredRecords = complianceRecords.filter(
    (record) => {
      const currentStatus =
        complianceStatuses[record.id] ||
        record.status;

      return (
        status === "All" ||
        currentStatus === status
      );
    }
  );

  return (
    <Layout>
      <div className="space-y-6">

        {/* PAGE HEADER */}
        <div>
          <h2 className="text-3xl font-bold">
            Compliance
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor compliance reviews and platform verification status.
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Pending Review
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                complianceRecords.filter(
                  (record) =>
                    (
                      complianceStatuses[
                        record.id
                      ] || record.status
                    ) === "Pending Review"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Approved
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                complianceRecords.filter(
                  (record) =>
                    (
                      complianceStatuses[
                        record.id
                      ] || record.status
                    ) === "Approved"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Rejected
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                complianceRecords.filter(
                  (record) =>
                    (
                      complianceStatuses[
                        record.id
                      ] || record.status
                    ) === "Rejected"
                ).length
              }
            </p>
          </div>

        </div>

        {/* QUEUE HEADER */}
        <div className="flex items-center justify-between">

          <h3 className="text-xl font-semibold">
            Compliance Queue
          </h3>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="rounded-lg border bg-white px-4 py-2"
          >
            <option value="All">
              All Status
            </option>

            <option value="Pending Review">
              Pending Review
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

        </div>

        {/* COMPLIANCE TABLE */}
        <div className="rounded-xl bg-white p-6 shadow">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b">

                <th className="pb-3">
                  Compliance ID
                </th>

                <th className="pb-3">
                  Platform / Channel
                </th>

                <th className="pb-3">
                  Requirement
                </th>

                <th className="pb-3">
                  Risk
                </th>

                <th className="pb-3">
                  Status
                </th>

                <th className="pb-3 text-right">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredRecords.map(
                (record) => {

                  const currentStatus =
                    complianceStatuses[
                      record.id
                    ] || record.status;

                  return (
                    <tr
                      key={record.id}
                      className="border-b last:border-0"
                    >

                      <td className="py-4 font-medium">

                        <Link
                          href={`/compliance/${record.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {record.id}
                        </Link>

                      </td>

                      <td>
                        {record.merchant}
                      </td>

                      <td>
                        {record.requirement}
                      </td>

                      <td>

                        <span
                          className={`font-semibold ${
                            record.risk === "High"
                              ? "text-red-600"
                              : record.risk === "Medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {record.risk}
                        </span>

                      </td>

                      <td>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            currentStatus === "Approved"
                              ? "bg-green-100 text-green-700"
                              : currentStatus === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {currentStatus}
                        </span>

                      </td>

                      <td className="text-right">

                        {currentStatus ===
                          "Pending Review" && (
                          <Link
                            href={`/compliance/${record.id}`}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                          >
                            Review
                          </Link>
                        )}

                        {currentStatus ===
                          "Approved" && (
                          <button
                            disabled
                            className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500"
                          >
                            Approved
                          </button>
                        )}

                        {currentStatus ===
                          "Rejected" && (
                          <button
                            disabled
                            className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500"
                          >
                            Rejected
                          </button>
                        )}

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

          {filteredRecords.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No compliance records found.
            </p>
          )}

        </div>

      </div>
    </Layout>
  );
}
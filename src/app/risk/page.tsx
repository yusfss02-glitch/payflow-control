"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const risks = [
  {
    id: "RISK001",
    transaction: "TXN003",
    merchant: "RoomLink",
    riskType: "High Value Transaction",
    score: 92,
  },
  {
    id: "RISK002",
    transaction: "TXN006",
    merchant: "InnFinder",
    riskType: "Unusual Payment Pattern",
    score: 84,
  },
  {
    id: "RISK003",
    transaction: "TXN002",
    merchant: "TripNest",
    riskType: "Velocity Alert",
    score: 67,
  },
];

export default function RiskPage() {
  const [status, setStatus] = useState("All");

  const {
    riskStatuses,
    updateRiskStatus,
  } = useWorkflow();

  const filteredRisks = risks.filter((risk) => {
    const currentStatus =
      riskStatuses[risk.id] || "Open";

    return (
      status === "All" ||
      currentStatus === status
    );
  });

  return (
    <Layout>
      <div className="space-y-6">

        {/* PAGE HEADER */}
        <div>
          <h2 className="text-3xl font-bold">
            Risk Monitoring
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor payment risk signals and investigate high-risk transactions.
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Open
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                risks.filter(
                  (risk) =>
                    (
                      riskStatuses[risk.id] ||
                      "Open"
                    ) === "Open"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Under Review
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                risks.filter(
                  (risk) =>
                    (
                      riskStatuses[risk.id] ||
                      "Open"
                    ) === "Under Review"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                risks.filter(
                  (risk) =>
                    (
                      riskStatuses[risk.id] ||
                      "Open"
                    ) === "Resolved"
                ).length
              }
            </p>
          </div>

        </div>

        {/* QUEUE HEADER */}
        <div className="flex items-center justify-between">

          <h3 className="text-xl font-semibold">
            Risk Alerts
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

            <option value="Open">
              Open
            </option>

            <option value="Under Review">
              Under Review
            </option>

            <option value="Resolved">
              Resolved
            </option>
          </select>

        </div>

        {/* RISK TABLE */}
        <div className="rounded-xl bg-white p-6 shadow">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b">

                <th className="pb-3">
                  Risk ID
                </th>

                <th className="pb-3">
                  Transaction
                </th>

                <th className="pb-3">
                  Platform / Channel
                </th>

                <th className="pb-3">
                  Risk Type
                </th>

                <th className="pb-3">
                  Score
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

              {filteredRisks.map((risk) => {

                const currentStatus =
                  riskStatuses[risk.id] ||
                  "Open";

                return (
                  <tr
                    key={risk.id}
                    className="border-b last:border-0"
                  >

                    <td className="py-4 font-medium">

                      <Link
                        href={`/risk/${risk.id}`}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {risk.id}
                      </Link>

                    </td>

                    <td>
                      <Link
                        href={`/transactions/${risk.transaction}`}
                        className="text-blue-600 hover:underline"
                      >
                        {risk.transaction}
                      </Link>
                    </td>

                    <td>
                      {risk.merchant}
                    </td>

                    <td>
                      {risk.riskType}
                    </td>

                    <td>
                      <span
                        className={`font-semibold ${
                          risk.score >= 80
                            ? "text-red-600"
                            : risk.score >= 60
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {risk.score}
                      </span>
                    </td>

                    <td>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          currentStatus === "Open"
                            ? "bg-red-100 text-red-700"
                            : currentStatus === "Under Review"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {currentStatus}
                      </span>

                    </td>

                    <td className="text-right">

                      {currentStatus === "Open" && (
                        <button
                          onClick={() =>
                            updateRiskStatus(
                              risk.id,
                              "Under Review"
                            )
                          }
                          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                        >
                          Review
                        </button>
                      )}

                      {currentStatus === "Under Review" && (
                        <button
                          onClick={() =>
                            updateRiskStatus(
                              risk.id,
                              "Resolved"
                            )
                          }
                          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                        >
                          Resolve
                        </button>
                      )}

                      {currentStatus === "Resolved" && (
                        <button
                          disabled
                          className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500"
                        >
                          Resolved
                        </button>
                      )}

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

          {filteredRisks.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No risk alerts found.
            </p>
          )}

        </div>

      </div>
    </Layout>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const risks = [
  {
    id: "RISK001",
    transaction: "TXN003",
    merchant: "Hotel C",
    score: 87,
    level: "High",
    status: "Detected",
  },
  {
    id: "RISK002",
    transaction: "TXN006",
    merchant: "Hotel F",
    score: 72,
    level: "Medium",
    status: "Reviewing",
  },
  {
    id: "RISK003",
    transaction: "TXN002",
    merchant: "Hotel B",
    score: 54,
    level: "Medium",
    status: "Mitigated",
  },
];

export default function RiskPage() {
  const [status, setStatus] = useState("All");

  const filteredRisks = risks.filter(
    (risk) =>
      status === "All" ||
      risk.status === status
  );

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h2 className="text-3xl font-bold">
            Risk Monitoring
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor transaction risk signals and mitigation activities.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Risk Queue
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

            <option value="Detected">
              Detected
            </option>

            <option value="Reviewing">
              Reviewing
            </option>

            <option value="Mitigated">
              Mitigated
            </option>
          </select>
        </div>

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
                  Merchant
                </th>

                <th className="pb-3">
                  Risk Score
                </th>

                <th className="pb-3">
                  Level
                </th>

                <th className="pb-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRisks.map((risk) => (
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
                    {risk.transaction}
                  </td>

                  <td>
                    {risk.merchant}
                  </td>

                  <td className="font-semibold">
                    {risk.score}
                  </td>

                  <td>
                    {risk.level === "High" && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        High
                      </span>
                    )}

                    {risk.level === "Medium" && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Medium
                      </span>
                    )}
                  </td>

                  <td>
                    {risk.status === "Detected" && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Detected
                      </span>
                    )}

                    {risk.status === "Reviewing" && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Reviewing
                      </span>
                    )}

                    {risk.status === "Mitigated" && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Mitigated
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {filteredRisks.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No risk records found.
            </p>
          )}
        </div>

      </div>
    </Layout>
  );
}
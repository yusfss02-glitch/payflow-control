"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const complianceRecords = [
  {
    id: "CMP001",
    transaction: "TXN003",
    merchant: "Hotel C",
    type: "Transaction Monitoring",
    priority: "High",
  },
  {
    id: "CMP002",
    transaction: "TXN006",
    merchant: "Hotel F",
    type: "Payment Monitoring",
    priority: "Medium",
  },
  {
    id: "CMP003",
    transaction: "TXN002",
    merchant: "Hotel B",
    type: "Settlement Monitoring",
    priority: "Medium",
  },
];

export default function CompliancePage() {
  const [status, setStatus] = useState("All");

  const { complianceStatuses } = useWorkflow();

  const filteredRecords = complianceRecords.filter(
    (record) => {
      const currentStatus =
        complianceStatuses[record.id] ||
        "Pending Review";

      return (
        status === "All" ||
        currentStatus === status
      );
    }
  );

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h2 className="text-3xl font-bold">
            Compliance
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor compliance cases and review activities.
          </p>
        </div>

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

            <option value="Reviewing">
              Reviewing
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b">

                <th className="pb-3">
                  Compliance ID
                </th>

                <th className="pb-3">
                  Transaction
                </th>

                <th className="pb-3">
                  Merchant
                </th>

                <th className="pb-3">
                  Type
                </th>

                <th className="pb-3">
                  Priority
                </th>

                <th className="pb-3">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredRecords.map((record) => {

                const currentStatus =
                  complianceStatuses[record.id] ||
                  "Pending Review";

                return (
                  <tr
                    key={record.id}
                    className="border-b last:border-0"
                  >

                    <td className="py-4 font-medium">
                      <Link
                        href={`/compliance/${record.id}`}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {record.id}
                      </Link>
                    </td>

                    <td>
                      <Link
                        href={`/transactions/${record.transaction}`}
                        className="text-blue-600 hover:underline"
                      >
                        {record.transaction}
                      </Link>
                    </td>

                    <td>
                      {record.merchant}
                    </td>

                    <td>
                      {record.type}
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          record.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {record.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          currentStatus === "Pending Review"
                            ? "bg-gray-100 text-gray-700"
                            : currentStatus === "Reviewing"
                            ? "bg-yellow-100 text-yellow-700"
                            : currentStatus === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {currentStatus}
                      </span>
                    </td>

                  </tr>
                );
              })}

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
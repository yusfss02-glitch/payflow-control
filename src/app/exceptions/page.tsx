"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const exceptions = [
  {
    id: "EXC001",
    transaction: "TXN003",
    merchant: "Hotel C",
    type: "Settlement Failure",
    priority: "High",
  },
  {
    id: "EXC002",
    transaction: "TXN006",
    merchant: "Hotel F",
    type: "Payment Exception",
    priority: "Medium",
  },
  {
    id: "EXC003",
    transaction: "TXN002",
    merchant: "Hotel B",
    type: "Reconciliation Difference",
    priority: "Medium",
  },
  {
    id: "EXC004",
    transaction: "TXN005",
    merchant: "Hotel E",
    type: "Payment Processing Exception",
    priority: "High",
  },
];

export default function ExceptionsPage() {
  const [status, setStatus] = useState("All");

  const {
    exceptionStatuses,
    updateExceptionStatus,
  } = useWorkflow();

  const filteredExceptions = exceptions.filter((exception) => {
    const currentStatus =
      exceptionStatuses[exception.id] || "Open";

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
            Exceptions
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor and resolve payment operation exceptions.
          </p>
        </div>

        {/* FILTER */}

        <div className="flex items-center justify-between">

          <h3 className="text-xl font-semibold">
            Exception Queue
          </h3>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

        {/* EXCEPTION TABLE */}

        <div className="rounded-xl bg-white p-6 shadow">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b">

                <th className="pb-3">
                  Exception ID
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

                <th className="pb-3 text-right">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredExceptions.map((exception) => {

                const currentStatus =
                  exceptionStatuses[exception.id] ||
                  "Open";

                return (
                  <tr
                    key={exception.id}
                    className="border-b last:border-0"
                  >

                    <td className="py-4 font-medium">

                      <Link
                        href={`/exceptions/${exception.id}`}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {exception.id}
                      </Link>

                    </td>

                    <td>

                      <Link
                        href={`/transactions/${exception.transaction}`}
                        className="text-blue-600 hover:underline"
                      >
                        {exception.transaction}
                      </Link>

                    </td>

                    <td>
                      {exception.merchant}
                    </td>

                    <td>
                      {exception.type}
                    </td>

                    <td>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          exception.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {exception.priority}
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
                            updateExceptionStatus(
                              exception.id,
                              "Under Review"
                            )
                          }
                          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                        >
                          Start Review
                        </button>
                      )}

                      {currentStatus === "Under Review" && (
                        <button
                          onClick={() =>
                            updateExceptionStatus(
                              exception.id,
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

          {filteredExceptions.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No exceptions found.
            </p>
          )}

        </div>

      </div>
    </Layout>
  );
}
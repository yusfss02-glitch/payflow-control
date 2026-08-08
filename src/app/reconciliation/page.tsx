"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const records = [
  {
    id: "REC001",
    transaction: "TXN001",
    merchant: "Hotel A",
    amount: "$1,250",
  },
  {
    id: "REC002",
    transaction: "TXN002",
    merchant: "Hotel B",
    amount: "$980",
  },
  {
    id: "REC003",
    transaction: "TXN003",
    merchant: "Hotel C",
    amount: "$2,430",
  },
  {
    id: "REC004",
    transaction: "TXN004",
    merchant: "Hotel D",
    amount: "$750",
  },
  {
    id: "REC005",
    transaction: "TXN005",
    merchant: "Hotel E",
    amount: "$1,890",
  },
];

export default function ReconciliationPage() {
  const [status, setStatus] = useState("All");

  const {
    reconciliationStatuses,
    updateReconciliationStatus,
  } = useWorkflow();

  const filteredRecords = records.filter((record) => {
    const currentStatus =
      reconciliationStatuses[record.id] ||
      "Unmatched";

    return (
      status === "All" ||
      currentStatus === status
    );
  });

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h2 className="text-3xl font-bold">
            Reconciliation
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor payment matching and reconciliation exceptions.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Matched
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                records.filter(
                  (record) =>
                    (reconciliationStatuses[record.id] ||
                      "Unmatched") === "Matched"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Unmatched
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                records.filter(
                  (record) =>
                    (reconciliationStatuses[record.id] ||
                      "Unmatched") === "Unmatched"
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
                records.filter(
                  (record) =>
                    (reconciliationStatuses[record.id] ||
                      "Unmatched") === "Under Review"
                ).length
              }
            </p>
          </div>

        </div>

        <div className="flex items-center justify-between">

          <h3 className="text-xl font-semibold">
            Reconciliation Queue
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

            <option value="Unmatched">
              Unmatched
            </option>

            <option value="Under Review">
              Under Review
            </option>

            <option value="Matched">
              Matched
            </option>
          </select>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b">

                <th className="pb-3">
                  Record
                </th>

                <th className="pb-3">
                  Transaction
                </th>

                <th className="pb-3">
                  Merchant
                </th>

                <th className="pb-3">
                  Amount
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

              {filteredRecords.map((record) => {

                const currentStatus =
                  reconciliationStatuses[record.id] ||
                  "Unmatched";

                return (
                  <tr
                    key={record.id}
                    className="border-b last:border-0"
                  >

                    <td className="py-4 font-medium">

                      <Link
                        href={`/reconciliation/${record.id}`}
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
                      {record.amount}
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          currentStatus === "Matched"
                            ? "bg-green-100 text-green-700"
                            : currentStatus === "Under Review"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {currentStatus}
                      </span>
                    </td>

                    <td className="text-right">

                      {currentStatus === "Unmatched" && (
                        <button
                          onClick={() =>
                            updateReconciliationStatus(
                              record.id,
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
                            updateReconciliationStatus(
                              record.id,
                              "Matched"
                            )
                          }
                          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                        >
                          Match
                        </button>
                      )}

                      {currentStatus === "Matched" && (
                        <button
                          disabled
                          className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500"
                        >
                          Matched
                        </button>
                      )}

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

          {filteredRecords.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No reconciliation records found.
            </p>
          )}

        </div>

      </div>
    </Layout>
  );
}
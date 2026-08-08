"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

type ExceptionStatus = "Open" | "Under Review" | "Resolved";

type Exception = {
  id: string;
  transaction: string;
  merchant: string;
  type: string;
  priority: string;
  status: ExceptionStatus;
};

const initialExceptions: Exception[] = [
  {
    id: "EXC001",
    transaction: "TXN003",
    merchant: "Hotel C",
    type: "Settlement Mismatch",
    priority: "High",
    status: "Open",
  },
  {
    id: "EXC002",
    transaction: "TXN006",
    merchant: "Hotel F",
    type: "Payment Failed",
    priority: "Medium",
    status: "Open",
  },
  {
    id: "EXC003",
    transaction: "TXN002",
    merchant: "Hotel B",
    type: "Settlement Delay",
    priority: "Low",
    status: "Resolved",
  },
];

export default function ExceptionsPage() {
  const [exceptions, setExceptions] =
    useState<Exception[]>(initialExceptions);

  const [filter, setFilter] = useState("All");

  const handleResolve = (id: string) => {
    setExceptions((current) =>
      current.map((exception) =>
        exception.id === id
          ? {
              ...exception,
              status: "Resolved",
            }
          : exception
      )
    );
  };

  const handleReview = (id: string) => {
    setExceptions((current) =>
      current.map((exception) =>
        exception.id === id
          ? {
              ...exception,
              status: "Under Review",
            }
          : exception
      )
    );
  };

  const filteredExceptions = exceptions.filter(
    (exception) =>
      filter === "All" || exception.status === filter
  );

  const openCount = exceptions.filter(
    (exception) => exception.status === "Open"
  ).length;

  const reviewCount = exceptions.filter(
    (exception) => exception.status === "Under Review"
  ).length;

  const resolvedCount = exceptions.filter(
    (exception) => exception.status === "Resolved"
  ).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">
            Exception Management
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor, review, and resolve payment exceptions.
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Open
            </p>

            <p className="mt-2 text-3xl font-bold">
              {openCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Under Review
            </p>

            <p className="mt-2 text-3xl font-bold">
              {reviewCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-bold">
              {resolvedCount}
            </p>
          </div>
        </div>

        {/* QUEUE HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Exception Queue
          </h3>

          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
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

        {/* TABLE */}
        <div className="rounded-xl bg-white p-6 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3">
                  Exception
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

                <th className="pb-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredExceptions.map(
                (exception) => (
                  <tr
                    key={exception.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 font-medium">
                      {exception.id}
                    </td>

                    <td>
                      {exception.transaction}
                    </td>

                    <td>
                      {exception.merchant}
                    </td>

                    <td>
                      {exception.type}
                    </td>

                    <td>
                      {exception.priority ===
                        "High" && (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          High
                        </span>
                      )}

                      {exception.priority ===
                        "Medium" && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Medium
                        </span>
                      )}

                      {exception.priority ===
                        "Low" && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          Low
                        </span>
                      )}
                    </td>

                    <td>
                      {exception.status ===
                        "Open" && (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Open
                        </span>
                      )}

                      {exception.status ===
                        "Under Review" && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Under Review
                        </span>
                      )}

                      {exception.status ===
                        "Resolved" && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Resolved
                        </span>
                      )}
                    </td>

                    <td>
                      {exception.status ===
                        "Open" && (
                        <button
                          onClick={() =>
                            handleReview(
                              exception.id
                            )
                          }
                          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                        >
                          Review
                        </button>
                      )}

                      {exception.status ===
                        "Under Review" && (
                        <button
                          onClick={() =>
                            handleResolve(
                              exception.id
                            )
                          }
                          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                        >
                          Resolve
                        </button>
                      )}

                      {exception.status ===
                        "Resolved" && (
                        <span className="text-sm text-gray-400">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
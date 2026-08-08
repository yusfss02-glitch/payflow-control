"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const exceptions = [
  {
    id: "EXC001",
    transaction: "TXN003",
    merchant: "Hotel C",
    type: "Settlement Failure",
    amount: "$2,430",
    status: "Open",
    priority: "High",
  },
  {
    id: "EXC002",
    transaction: "TXN006",
    merchant: "Hotel F",
    type: "Payment Exception",
    amount: "$560",
    status: "Under Review",
    priority: "Medium",
  },
  {
    id: "EXC003",
    transaction: "TXN002",
    merchant: "Hotel B",
    type: "Reconciliation Difference",
    amount: "$980",
    status: "Resolved",
    priority: "Medium",
  },
];

export default function ExceptionsPage() {
  const [status, setStatus] = useState("All");

  const filteredExceptions = exceptions.filter(
    (exception) =>
      status === "All" ||
      exception.status === status
  );

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h2 className="text-3xl font-bold">
            Exceptions
          </h2>

          <p className="mt-1 text-gray-500">
            Investigate and resolve payment operational exceptions.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Exception Queue
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
                  Amount
                </th>

                <th className="pb-3">
                  Status
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
                      <Link
                        href={`/exceptions/${exception.id}`}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {exception.id}
                      </Link>
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
                      {exception.amount}
                    </td>

                    <td>
                      {exception.status === "Open" && (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Open
                        </span>
                      )}

                      {exception.status === "Under Review" && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Under Review
                        </span>
                      )}

                      {exception.status === "Resolved" && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Resolved
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )}
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
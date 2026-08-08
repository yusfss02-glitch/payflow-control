"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const records = [
  {
    id: "REC001",
    transaction: "TXN001",
    merchant: "Hotel A",
    amount: "$1,250",
    status: "Matched",
  },
  {
    id: "REC002",
    transaction: "TXN002",
    merchant: "Hotel B",
    amount: "$980",
    status: "Under Review",
  },
  {
    id: "REC003",
    transaction: "TXN003",
    merchant: "Hotel C",
    amount: "$2,430",
    status: "Unmatched",
  },
  {
    id: "REC004",
    transaction: "TXN004",
    merchant: "Hotel D",
    amount: "$750",
    status: "Matched",
  },
  {
    id: "REC005",
    transaction: "TXN005",
    merchant: "Hotel E",
    amount: "$1,890",
    status: "Unmatched",
  },
];

export default function ReconciliationPage() {
  const [status, setStatus] = useState("All");

  const filteredRecords = records.filter(
    (record) =>
      status === "All" || record.status === status
  );

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
              2
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Unmatched
            </p>

            <p className="mt-2 text-3xl font-bold">
              2
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Under Review
            </p>

            <p className="mt-2 text-3xl font-bold">
              1
            </p>
          </div>

        </div>

        <div className="flex items-center justify-between">

          <h3 className="text-xl font-semibold">
            Reconciliation Queue
          </h3>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border bg-white px-4 py-2"
          >
            <option value="All">
              All Status
            </option>

            <option value="Matched">
              Matched
            </option>

            <option value="Unmatched">
              Unmatched
            </option>

            <option value="Under Review">
              Under Review
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

              </tr>
            </thead>

            <tbody>

              {filteredRecords.map((record) => (
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

                    {record.status === "Matched" && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Matched
                      </span>
                    )}

                    {record.status === "Unmatched" && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Unmatched
                      </span>
                    )}

                    {record.status === "Under Review" && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Under Review
                      </span>
                    )}

                  </td>

                </tr>
              ))}

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
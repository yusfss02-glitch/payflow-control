"use client";

import React, { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const transactions = [
  {
    id: "TXN001",
    merchant: "Hotel A",
    amount: "$1,250",
    status: "Success",
    method: "Card",
    transactionDate: "April 1, 2026",
  },
  {
    id: "TXN002",
    merchant: "Hotel B",
    amount: "$980",
    status: "Pending",
    method: "Bank Transfer",
    transactionDate: "April 2, 2026",
  },
  {
    id: "TXN003",
    merchant: "Hotel C",
    amount: "$2,430",
    status: "Exception",
    method: "Card",
    transactionDate: "April 3, 2026",
  },
  {
    id: "TXN004",
    merchant: "Hotel D",
    amount: "$750",
    status: "Success",
    method: "QR Payment",
    transactionDate: "April 4, 2026",
  },
  {
    id: "TXN005",
    merchant: "Hotel E",
    amount: "$1,890",
    status: "Success",
    method: "Card",
    transactionDate: "April 5, 2026",
  },
  {
    id: "TXN006",
    merchant: "Hotel F",
    amount: "$560",
    status: "Exception",
    method: "Bank Transfer",
    transactionDate: "April 6, 2026",
  },
];

export default function TransactionsPage() {
  const {
    transactionStatuses,
    updateTransactionStatus,
  } = useWorkflow();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const currentStatus =
        transactionStatuses[transaction.id] ||
        transaction.status;

      const matchesSearch =
        transaction.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.merchant
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        currentStatus === status;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <Layout>
      <div className="space-y-6">

        {/* PAGE HEADER */}

        <div>
          <h2 className="text-3xl font-bold">
            Transactions
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor payment transactions across merchants.
          </p>
        </div>

        {/* FILTERS */}

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search transaction or merchant..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-80 rounded-lg border bg-white px-4 py-2"
          />

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

            <option value="Success">
              Success
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Exception">
              Exception
            </option>

            <option value="Resolved">
              Resolved
            </option>
          </select>

        </div>

        {/* TRANSACTION TABLE */}

        <div className="rounded-xl bg-white p-6 shadow">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b">

                <th className="pb-3">
                  Transaction ID
                </th>

                <th className="pb-3">
                  Transaction Date
                </th>

                <th className="pb-3">
                  Merchant
                </th>

                <th className="pb-3">
                  Amount
                </th>

                <th className="pb-3">
                  Method
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

              {filteredTransactions.map(
                (transaction) => {

                  const currentStatus =
                    transactionStatuses[
                      transaction.id
                    ] ||
                    transaction.status;

                  return (
                    <tr
                      key={transaction.id}
                      className="border-b last:border-0"
                    >

                      <td className="py-4 font-medium">

                        <Link
                          href={`/transactions/${transaction.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {transaction.id}
                        </Link>

                      </td>

                      <td>
                        {transaction.transactionDate}
                      </td>

                      <td>
                        {transaction.merchant}
                      </td>

                      <td>
                        {transaction.amount}
                      </td>

                      <td>
                        {transaction.method}
                      </td>

                      <td>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            currentStatus === "Success"
                              ? "bg-green-100 text-green-700"
                              : currentStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : currentStatus === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {currentStatus}
                        </span>

                      </td>

                      <td className="text-right">

                        {currentStatus !== "Resolved" ? (
                          <button
                            onClick={() =>
                              updateTransactionStatus(
                                transaction.id,
                                "Resolved"
                              )
                            }
                            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700"
                          >
                            Resolved
                          </button>
                        ) : (
                          <span className="text-xs font-medium text-gray-400">
                            Resolved
                          </span>
                        )}

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

          {filteredTransactions.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No transactions found.
            </p>
          )}

        </div>

      </div>
    </Layout>
  );
}
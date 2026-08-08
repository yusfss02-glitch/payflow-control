"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

const initialExceptions = [
  {
    id: "EXC001",
    transaction: "TXN003",
    merchant: "Hotel C",
    type: "Settlement Mismatch",
    amount: "$2,430",
    priority: "High",
    status: "Open",
  },
  {
    id: "EXC002",
    transaction: "TXN006",
    merchant: "Hotel F",
    type: "Payment Failed",
    amount: "$560",
    priority: "Medium",
    status: "Open",
  },
  {
    id: "EXC003",
    transaction: "TXN002",
    merchant: "Hotel B",
    type: "Settlement Delay",
    amount: "$980",
    priority: "Low",
    status: "Under Review",
  },
];

export default function ExceptionsPage() {
  const [exceptions, setExceptions] = useState(initialExceptions);
  const [status, setStatus] = useState("All");

  const filteredExceptions = exceptions.filter(
    (exception) =>
      status === "All" || exception.status === status
  );

  const resolveException = (id: string) => {
    setExceptions((current) =>
      current.map((exception) =>
        exception.id === id
          ? { ...exception, status: "Resolved" }
          : exception
      )
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Exception Management</h2>
          <p className="mt-1 text-gray-500">
            Monitor, review, and resolve payment exceptions.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Open</p>
            <p className="mt-2 text-3xl font-bold">
              {exceptions.filter((e) => e.status === "Open").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Under Review</p>
            <p className="mt-2 text-3xl font-bold">
              {exceptions.filter((e) => e.status === "Under Review").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Resolved</p>
            <p className="mt-2 text-3xl font-bold">
              {exceptions.filter((e) => e.status === "Resolved").length}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Exception Queue</h3>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border bg-white px-4 py-2"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3">Exception</th>
                <th className="pb-3">Transaction</th>
                <th className="pb-3">Merchant</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredExceptions.map((exception) => (
                <tr
                  key={exception.id}
                  className="border-b last:border-0"
                >
                  <td className="py-4 font-medium">{exception.id}</td>
                  <td>{exception.transaction}</td>
                  <td>{exception.merchant}</td>
                  <td>{exception.type}</td>
                  <td>{exception.priority}</td>
                  <td>{exception.status}</td>
                  <td>
                    {exception.status !== "Resolved" && (
                      <button
                        onClick={() => resolveException(exception.id)}
                        className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
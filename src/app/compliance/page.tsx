"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

const initialItems = [
  {
    id: "CMP001",
    category: "Transaction Monitoring",
    requirement: "High-value transaction review",
    owner: "Risk Operations",
    status: "Compliant",
  },
  {
    id: "CMP002",
    category: "Reconciliation",
    requirement: "Unmatched transaction investigation",
    owner: "Finance Operations",
    status: "Action Required",
  },
  {
    id: "CMP003",
    category: "Exception Management",
    requirement: "Exception resolution tracking",
    owner: "Payment Operations",
    status: "Compliant",
  },
  {
    id: "CMP004",
    category: "Audit Trail",
    requirement: "Operational activity logging",
    owner: "System",
    status: "Under Review",
  },
];

export default function CompliancePage() {
  const [items, setItems] = useState(initialItems);
  const [status, setStatus] = useState("All");

  const filteredItems = items.filter(
    (item) => status === "All" || item.status === status
  );

  const resolveItem = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "Compliant" }
          : item
      )
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Compliance</h2>
          <p className="mt-1 text-gray-500">
            Monitor operational controls and compliance-related activities.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Compliant</p>
            <p className="mt-2 text-3xl font-bold">
              {items.filter((item) => item.status === "Compliant").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Action Required</p>
            <p className="mt-2 text-3xl font-bold">
              {items.filter((item) => item.status === "Action Required").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Under Review</p>
            <p className="mt-2 text-3xl font-bold">
              {items.filter((item) => item.status === "Under Review").length}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Compliance Control Monitor</h3>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border bg-white px-4 py-2"
          >
            <option value="All">All Status</option>
            <option value="Compliant">Compliant</option>
            <option value="Action Required">Action Required</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3">Control</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Requirement</th>
                <th className="pb-3">Owner</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="py-4 font-medium">{item.id}</td>
                  <td>{item.category}</td>
                  <td>{item.requirement}</td>
                  <td>{item.owner}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.status !== "Compliant" && (
                      <button
                        onClick={() => resolveItem(item.id)}
                        className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
                      >
                        Mark Compliant
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
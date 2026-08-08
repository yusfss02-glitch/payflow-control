"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

type ComplianceStatus =
  | "Compliant"
  | "Under Review"
  | "Action Required";

type ComplianceItem = {
  id: string;
  area: string;
  requirement: string;
  merchant: string;
  status: ComplianceStatus;
  dueDate: string;
};

const initialItems: ComplianceItem[] = [
  {
    id: "CMP001",
    area: "KYC",
    requirement: "Merchant Verification",
    merchant: "Hotel A",
    status: "Compliant",
    dueDate: "Aug 12, 2026",
  },
  {
    id: "CMP002",
    area: "Transaction Monitoring",
    requirement: "High-Risk Transaction Review",
    merchant: "Hotel C",
    status: "Action Required",
    dueDate: "Aug 10, 2026",
  },
  {
    id: "CMP003",
    area: "AML",
    requirement: "Suspicious Activity Review",
    merchant: "Hotel F",
    status: "Under Review",
    dueDate: "Aug 14, 2026",
  },
  {
    id: "CMP004",
    area: "Settlement",
    requirement: "Settlement Control Check",
    merchant: "Hotel D",
    status: "Compliant",
    dueDate: "Aug 18, 2026",
  },
];

export default function CompliancePage() {
  const [items, setItems] =
    useState<ComplianceItem[]>(initialItems);

  const [filter, setFilter] = useState("All");

  const handleReview = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Under Review",
            }
          : item
      )
    );
  };

  const handleResolve = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Compliant",
            }
          : item
      )
    );
  };

  const filteredItems = items.filter(
    (item) =>
      filter === "All" || item.status === filter
  );

  const compliantCount = items.filter(
    (item) => item.status === "Compliant"
  ).length;

  const reviewCount = items.filter(
    (item) => item.status === "Under Review"
  ).length;

  const actionCount = items.filter(
    (item) => item.status === "Action Required"
  ).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">
            Compliance
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor compliance controls and required actions across payment operations.
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Compliant
            </p>

            <p className="mt-2 text-3xl font-bold">
              {compliantCount}
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
              Action Required
            </p>

            <p className="mt-2 text-3xl font-bold">
              {actionCount}
            </p>
          </div>
        </div>

        {/* QUEUE HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Compliance Control Queue
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

            <option value="Compliant">
              Compliant
            </option>

            <option value="Under Review">
              Under Review
            </option>

            <option value="Action Required">
              Action Required
            </option>
          </select>
        </div>

        {/* TABLE */}
        <div className="rounded-xl bg-white p-6 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3">
                  Control
                </th>

                <th className="pb-3">
                  Area
                </th>

                <th className="pb-3">
                  Requirement
                </th>

                <th className="pb-3">
                  Merchant
                </th>

                <th className="pb-3">
                  Due Date
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
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-0"
                >
                  <td className="py-4 font-medium">
                    {item.id}
                  </td>

                  <td>{item.area}</td>

                  <td>{item.requirement}</td>

                  <td>{item.merchant}</td>

                  <td>{item.dueDate}</td>

                  <td>
                    {item.status ===
                      "Compliant" && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Compliant
                      </span>
                    )}

                    {item.status ===
                      "Under Review" && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Under Review
                      </span>
                    )}

                    {item.status ===
                      "Action Required" && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Action Required
                      </span>
                    )}
                  </td>

                  <td>
                    {item.status ===
                      "Action Required" && (
                      <button
                        onClick={() =>
                          handleReview(item.id)
                        }
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                      >
                        Review
                      </button>
                    )}

                    {item.status ===
                      "Under Review" && (
                      <button
                        onClick={() =>
                          handleResolve(item.id)
                        }
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                      >
                        Resolve
                      </button>
                    )}

                    {item.status ===
                      "Compliant" && (
                      <span className="text-sm text-gray-400">
                        Completed
                      </span>
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
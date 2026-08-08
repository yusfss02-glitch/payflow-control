"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

type RiskStatus = "Open" | "Under Review" | "Resolved";
type RiskLevel = "High" | "Medium" | "Low";

type RiskAlert = {
  id: string;
  transaction: string;
  merchant: string;
  riskType: string;
  level: RiskLevel;
  status: RiskStatus;
};

const initialAlerts: RiskAlert[] = [
  {
    id: "RISK001",
    transaction: "TXN007",
    merchant: "Hotel G",
    riskType: "Unusual Transaction",
    level: "High",
    status: "Open",
  },
  {
    id: "RISK002",
    transaction: "TXN008",
    merchant: "Hotel H",
    riskType: "Multiple Failed Payments",
    level: "Medium",
    status: "Open",
  },
  {
    id: "RISK003",
    transaction: "TXN009",
    merchant: "Hotel I",
    riskType: "Settlement Anomaly",
    level: "High",
    status: "Under Review",
  },
  {
    id: "RISK004",
    transaction: "TXN010",
    merchant: "Hotel J",
    riskType: "Amount Threshold",
    level: "Low",
    status: "Resolved",
  },
];

export default function RiskPage() {
  const [alerts, setAlerts] =
    useState<RiskAlert[]>(initialAlerts);

  const [filter, setFilter] = useState("All");

  const handleReview = (id: string) => {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? { ...alert, status: "Under Review" }
          : alert
      )
    );
  };

  const handleResolve = (id: string) => {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? { ...alert, status: "Resolved" }
          : alert
      )
    );
  };

  const filteredAlerts = alerts.filter(
    (alert) =>
      filter === "All" || alert.level === filter
  );

  const highCount = alerts.filter(
    (alert) => alert.level === "High"
  ).length;

  const mediumCount = alerts.filter(
    (alert) => alert.level === "Medium"
  ).length;

  const openCount = alerts.filter(
    (alert) => alert.status === "Open"
  ).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">
            Risk Monitoring
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor payment risk signals and review high-risk transactions.
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              High Risk Alerts
            </p>

            <p className="mt-2 text-3xl font-bold">
              {highCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Medium Risk Alerts
            </p>

            <p className="mt-2 text-3xl font-bold">
              {mediumCount}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Open Risk Alerts
            </p>

            <p className="mt-2 text-3xl font-bold">
              {openCount}
            </p>
          </div>
        </div>

        {/* QUEUE HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Risk Alert Queue
          </h3>

          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
            className="rounded-lg border bg-white px-4 py-2"
          >
            <option value="All">All Risk Levels</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="rounded-xl bg-white p-6 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3">Alert</th>
                <th className="pb-3">Transaction</th>
                <th className="pb-3">Merchant</th>
                <th className="pb-3">Risk Type</th>
                <th className="pb-3">Risk Level</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="border-b last:border-0"
                >
                  <td className="py-4 font-medium">
                    {alert.id}
                  </td>

                  <td>{alert.transaction}</td>

                  <td>{alert.merchant}</td>

                  <td>{alert.riskType}</td>

                  <td>
                    {alert.level === "High" && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        High
                      </span>
                    )}

                    {alert.level === "Medium" && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Medium
                      </span>
                    )}

                    {alert.level === "Low" && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        Low
                      </span>
                    )}
                  </td>

                  <td>
                    {alert.status === "Open" && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Open
                      </span>
                    )}

                    {alert.status === "Under Review" && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Under Review
                      </span>
                    )}

                    {alert.status === "Resolved" && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Resolved
                      </span>
                    )}
                  </td>

                  <td>
                    {alert.status === "Open" && (
                      <button
                        onClick={() =>
                          handleReview(alert.id)
                        }
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                      >
                        Review
                      </button>
                    )}

                    {alert.status === "Under Review" && (
                      <button
                        onClick={() =>
                          handleResolve(alert.id)
                        }
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                      >
                        Resolve
                      </button>
                    )}

                    {alert.status === "Resolved" && (
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
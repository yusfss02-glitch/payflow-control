"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

const initialAlerts = [
  {
    id: "RISK001",
    transaction: "TXN003",
    merchant: "Hotel C",
    type: "High Transaction Value",
    amount: "$2,430",
    risk: "High",
    status: "Open",
  },
  {
    id: "RISK002",
    transaction: "TXN006",
    merchant: "Hotel F",
    type: "Repeated Payment Failure",
    amount: "$560",
    risk: "Medium",
    status: "Open",
  },
  {
    id: "RISK003",
    transaction: "TXN002",
    merchant: "Hotel B",
    type: "Settlement Anomaly",
    amount: "$980",
    risk: "Medium",
    status: "Under Review",
  },
  {
    id: "RISK004",
    transaction: "TXN005",
    merchant: "Hotel E",
    type: "Unusual Transaction Pattern",
    amount: "$1,890",
    risk: "Low",
    status: "Open",
  },
];

export default function RiskPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [risk, setRisk] = useState("All");

  const filteredAlerts = alerts.filter(
    (alert) => risk === "All" || alert.risk === risk
  );

  const reviewAlert = (id: string) => {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? { ...alert, status: "Under Review" }
          : alert
      )
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Risk Monitoring</h2>
          <p className="mt-1 text-gray-500">
            Monitor payment risk indicators and review potential anomalies.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">High Risk</p>
            <p className="mt-2 text-3xl font-bold">
              {alerts.filter((a) => a.risk === "High").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Medium Risk</p>
            <p className="mt-2 text-3xl font-bold">
              {alerts.filter((a) => a.risk === "Medium").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Under Review</p>
            <p className="mt-2 text-3xl font-bold">
              {alerts.filter((a) => a.status === "Under Review").length}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Risk Alert Queue</h3>

          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="rounded-lg border bg-white px-4 py-2"
          >
            <option value="All">All Risk Levels</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3">Alert</th>
                <th className="pb-3">Transaction</th>
                <th className="pb-3">Merchant</th>
                <th className="pb-3">Risk Indicator</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Risk</th>
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
                  <td className="py-4 font-medium">{alert.id}</td>
                  <td>{alert.transaction}</td>
                  <td>{alert.merchant}</td>
                  <td>{alert.type}</td>
                  <td>{alert.amount}</td>
                  <td>{alert.risk}</td>
                  <td>{alert.status}</td>
                  <td>
                    {alert.status !== "Under Review" && (
                      <button
                        onClick={() => reviewAlert(alert.id)}
                        className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
                      >
                        Review
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
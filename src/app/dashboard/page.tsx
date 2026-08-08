"use client";

import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const kpis = [
  {
    title: "Transactions Today",
    value: "12,458",
    description: "Payment transactions processed",
    href: "/transactions",
  },
  {
    title: "Settlement Success",
    value: "98.7%",
    description: "Successfully reconciled",
    href: "/reconciliation",
  },
  {
    title: "Open Exceptions",
    value: "24",
    description: "Exceptions requiring attention",
    href: "/exceptions",
  },
  {
    title: "High Risk Alerts",
    value: "7",
    description: "Potential risk indicators",
    href: "/risk",
  },
];

const activities = [
  {
    id: "EXC001",
    title: "Settlement mismatch detected",
    detail: "TXN003 · Hotel C",
    href: "/exceptions/EXC001",
    type: "exception",
  },
  {
    id: "RISK001",
    title: "High-risk transaction identified",
    detail: "TXN003 · $2,430",
    href: "/risk/RISK001",
    type: "risk",
  },
  {
    id: "CMP004",
    title: "Compliance review pending",
    detail: "CMP004 · Audit Trail",
    href: "/compliance/CMP004",
    type: "compliance",
  },
  {
    id: "REC005",
    title: "Unmatched transaction",
    detail: "TXN005 · Hotel E",
    href: "/reconciliation/REC005",
    type: "reconciliation",
  },
];

export default function DashboardPage() {
  const {
    exceptionStatuses,
    riskStatuses,
    complianceStatuses,
    reconciliationStatuses,
  } = useWorkflow();

  const visibleActivities = activities.filter((activity) => {
    if (activity.type === "exception") {
      return exceptionStatuses[activity.id] !== "Resolved";
    }

    if (activity.type === "risk") {
      return riskStatuses[activity.id] !== "Resolved";
    }

    if (activity.type === "compliance") {
      const status =
        complianceStatuses[activity.id] || "Pending Review";

      return (
        status !== "Approved" &&
        status !== "Rejected"
      );
    }

    if (activity.type === "reconciliation") {
      return (
        reconciliationStatuses[activity.id] !== "Matched"
      );
    }

    return true;
  });

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="mt-1 text-gray-500">
            Payment operations overview and key operational alerts.
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Link
              key={kpi.title}
              href={kpi.href}
              className="rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm text-gray-500">
                {kpi.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                {kpi.value}
              </h3>

              <p className="mt-2 text-xs text-gray-400">
                {kpi.description}
              </p>
            </Link>
          ))}
        </div>

        {/* RECENT ACTIVITY */}
        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                Recent Activity
              </h3>

              <span className="text-sm text-gray-400">
                Live view
              </span>
            </div>

            <div className="mt-5 space-y-4">

              {visibleActivities.length > 0 ? (
                visibleActivities.map((activity) => (
                  <Link
                    key={activity.id}
                    href={activity.href}
                    className="block rounded-lg border p-4 transition hover:bg-gray-50"
                  >
                    <p className="font-medium">
                      {activity.title}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {activity.detail}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="py-6 text-center text-sm text-gray-500">
                  No outstanding operational activity.
                </p>
              )}

            </div>
          </div>

          {/* OPERATIONAL HEALTH */}
          <div className="rounded-xl bg-white p-6 shadow">

            <h3 className="text-xl font-semibold">
              Operational Health
            </h3>

            <div className="mt-5 space-y-5">

              <div>
                <div className="flex justify-between text-sm">
                  <span>Payment Processing</span>
                  <span className="font-medium">
                    99.2%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-200">
                  <div className="h-2 w-[99%] rounded-full bg-slate-900" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Reconciliation</span>
                  <span className="font-medium">
                    96.4%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-200">
                  <div className="h-2 w-[96%] rounded-full bg-slate-900" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Compliance Controls</span>
                  <span className="font-medium">
                    97.8%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-200">
                  <div className="h-2 w-[98%] rounded-full bg-slate-900" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Risk Monitoring</span>
                  <span className="font-medium">
                    94.6%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-200">
                  <div className="h-2 w-[95%] rounded-full bg-slate-900" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}
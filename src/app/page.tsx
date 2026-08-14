"use client";

import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const activities = [
  {
    id: "EXC001",
    title: "Settlement mismatch detected",
    detail: "TXN003 · RoomLink",
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
    detail: "CMP004 · TravelHub",
    href: "/compliance/CMP004",
    type: "compliance",
  },
  {
    id: "REC005",
    title: "Unmatched transaction",
    detail: "TXN005 · BookStay",
    href: "/reconciliation/REC005",
    type: "reconciliation",
  },
  {
    id: "EXC004",
    title: "Payment processing exception",
    detail: "TXN005 · BookStay",
    href: "/exceptions/EXC004",
    type: "exception",
  },
];

export default function DashboardPage() {
  const {
    exceptionStatuses,
    riskStatuses,
    complianceStatuses,
    reconciliationStatuses,
  } = useWorkflow();

  const isActivityActive = (
    activity: (typeof activities)[number]
  ) => {
    if (activity.type === "exception") {
      const currentStatus =
        exceptionStatuses[activity.id] || "Open";

      return currentStatus !== "Resolved";
    }

    if (activity.type === "risk") {
      const currentStatus =
        riskStatuses[activity.id] || "Open";

      return currentStatus !== "Resolved";
    }

    if (activity.type === "compliance") {
      const currentStatus =
        complianceStatuses[activity.id] ||
        "Pending Review";

      return (
        currentStatus !== "Approved" &&
        currentStatus !== "Rejected"
      );
    }

    if (activity.type === "reconciliation") {
      const currentStatus =
        reconciliationStatuses[activity.id] ||
        "Unmatched";

      return currentStatus !== "Matched";
    }

    return true;
  };

  const visibleActivities =
    activities.filter(isActivityActive);

  /*
   * RECONCILIATION
   *
   * There are 5 reconciliation records.
   */

  const reconciliationTotal = 5;

  const matchedCount =
    Object.values(reconciliationStatuses).filter(
      (status) => status === "Matched"
    ).length;

  const settlementSuccess =
    reconciliationTotal > 0
      ? (matchedCount / reconciliationTotal) * 100
      : 0;

  /*
   * OPEN EXCEPTIONS
   *
   * There are 4 exception records.
   */

  const exceptionIds = [
    "EXC001",
    "EXC002",
    "EXC003",
    "EXC004",
  ];

  const openExceptions =
    exceptionIds.filter((id) => {
      const currentStatus =
        exceptionStatuses[id] || "Open";

      return currentStatus !== "Resolved";
    }).length;

  /*
   * HIGH RISK ALERTS
   */

  const riskIds = [
    "RISK001",
    "RISK002",
    "RISK003",
  ];

  const highRiskAlerts =
    riskIds.filter((id) => {
      const currentStatus =
        riskStatuses[id] || "Open";

      return currentStatus !== "Resolved";
    }).length;

  return (
    <Layout>
      <div className="space-y-6">

        {/* PAGE HEADER */}

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              Dashboard
            </h2>

            <p className="mt-1 text-gray-500">
              Payment operations overview and key
              operational alerts.
            </p>
          </div>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Refresh Demo
          </button>

        </div>

        {/* KPI CARDS */}

        <div className="grid grid-cols-4 gap-4">

          {/* TRANSACTIONS */}

          <Link
            href="/transactions"
            className="rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-gray-500">
              Transactions Today
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              6
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Payment transactions processed
            </p>
          </Link>

          {/* SETTLEMENT SUCCESS */}

          <Link
            href="/reconciliation"
            className="rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-gray-500">
              Settlement Success
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {settlementSuccess.toFixed(1)}%
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Successfully reconciled
            </p>
          </Link>

          {/* OPEN EXCEPTIONS */}

          <Link
            href="/exceptions"
            className="rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-gray-500">
              Open Exceptions
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {openExceptions}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Exceptions requiring attention
            </p>
          </Link>

          {/* HIGH RISK ALERTS */}

          <Link
            href="/risk"
            className="rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-gray-500">
              High Risk Alerts
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {highRiskAlerts}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Potential risk indicators
            </p>
          </Link>

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

              {visibleActivities.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-500">
                  No active operational alerts.
                </p>
              ) : (
                visibleActivities.map(
                  (activity) => (
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
                  )
                )
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
                  <span>
                    Payment Processing
                  </span>

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
                  <span>
                    Reconciliation
                  </span>

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
                  <span>
                    Compliance Controls
                  </span>

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
                  <span>
                    Risk Monitoring
                  </span>

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
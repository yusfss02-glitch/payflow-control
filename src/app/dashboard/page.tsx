"use client";

import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const transactions = [
  {
    id: "TXN001",
    merchant: "Hotel A",
    amount: "$1,250",
  },
  {
    id: "TXN002",
    merchant: "Hotel B",
    amount: "$980",
  },
  {
    id: "TXN003",
    merchant: "Hotel C",
    amount: "$2,430",
  },
  {
    id: "TXN004",
    merchant: "Hotel D",
    amount: "$750",
  },
  {
    id: "TXN005",
    merchant: "Hotel E",
    amount: "$1,890",
  },
  {
    id: "TXN006",
    merchant: "Hotel F",
    amount: "$560",
  },
];

const reconciliationRecords = [
  {
    id: "REC001",
    transaction: "TXN001",
  },
  {
    id: "REC002",
    transaction: "TXN002",
  },
  {
    id: "REC003",
    transaction: "TXN003",
  },
  {
    id: "REC004",
    transaction: "TXN004",
  },
  {
    id: "REC005",
    transaction: "TXN005",
  },
];

const exceptionRecords = [
  {
    id: "EXC001",
    transaction: "TXN003",
  },
  {
    id: "EXC002",
    transaction: "TXN002",
  },
  {
    id: "EXC003",
    transaction: "TXN004",
  },
];

const riskRecords = [
  {
    id: "RISK001",
    transaction: "TXN003",
    level: "High",
  },
  {
    id: "RISK002",
    transaction: "TXN006",
    level: "Medium",
  },
  {
    id: "RISK003",
    transaction: "TXN002",
    level: "Medium",
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
    reconciliationStatuses,
    exceptionStatuses,
    complianceStatuses,
    riskStatuses,
  } = useWorkflow();

  /*
   * RECONCILIATION KPI
   */

  const matchedReconciliations =
    reconciliationRecords.filter(
      (record) =>
        (reconciliationStatuses[record.id] ||
          "Unmatched") === "Matched"
    ).length;

  const settlementSuccess =
    reconciliationRecords.length === 0
      ? "0.0"
      : (
          (matchedReconciliations /
            reconciliationRecords.length) *
          100
        ).toFixed(1);

  /*
   * EXCEPTION KPI
   */

  const openExceptions =
    exceptionRecords.filter((record) => {
      const status =
        exceptionStatuses[record.id] ||
        "Open";

      return status !== "Resolved";
    }).length;

  /*
   * HIGH RISK KPI
   */

  const highRiskAlerts =
    riskRecords.filter((record) => {
      const status =
        riskStatuses[record.id] ||
        "Open";

      return (
        record.level === "High" &&
        status !== "Resolved"
      );
    }).length;

  /*
   * RECENT ACTIVITY
   */

  const visibleActivities =
    activities.filter((activity) => {
      if (activity.type === "exception") {
        const status =
          exceptionStatuses[activity.id] ||
          "Open";

        return status !== "Resolved";
      }

      if (activity.type === "risk") {
        const status =
          riskStatuses[activity.id] ||
          "Open";

        return status !== "Resolved";
      }

      if (activity.type === "compliance") {
        const status =
          complianceStatuses[activity.id] ||
          "Pending Review";

        return (
          status !== "Approved" &&
          status !== "Rejected"
        );
      }

      if (activity.type === "reconciliation") {
        const status =
          reconciliationStatuses[activity.id] ||
          "Unmatched";

        return status !== "Matched";
      }

      return true;
    });

  return (
    <Layout>
      <div className="space-y-6">

        {/* PAGE HEADER */}

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

          {/* TRANSACTIONS */}

          <Link
            href="/transactions"
            className="rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-gray-500">
              Transactions Today
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {transactions.length}
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
              {settlementSuccess}%
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

        {/* RECENT ACTIVITY + OPERATIONAL HEALTH */}

        <div className="grid grid-cols-2 gap-6">

          {/* RECENT ACTIVITY */}

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

                <div className="rounded-lg border border-dashed p-6 text-center">

                  <p className="font-medium text-gray-600">
                    No active operational alerts
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    All recent operational issues have been resolved.
                  </p>

                </div>

              ) : (

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
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

const exceptions = [
  {
    id: "EXC001",
    title: "Settlement mismatch detected",
    detail: "TXN003 · Hotel C",
  },
  {
    id: "EXC002",
    title: "Payment exception detected",
    detail: "TXN006 · Hotel F",
  },
  {
    id: "EXC003",
    title: "Settlement exception detected",
    detail: "TXN002 · Hotel B",
  },
];

const riskRecords = [
  {
    id: "RISK001",
    title: "High-risk transaction identified",
    detail: "TXN003 · $2,430",
  },
  {
    id: "RISK002",
    title: "Unusual payment pattern",
    detail: "TXN006 · $560",
  },
  {
    id: "RISK003",
    title: "Velocity alert",
    detail: "TXN002 · $980",
  },
];

const complianceRecords = [
  {
    id: "CMP001",
    title: "Compliance review pending",
    detail: "CMP001 · KYC Verification",
  },
  {
    id: "CMP002",
    title: "Compliance control approved",
    detail: "CMP002 · Business Verification",
  },
  {
    id: "CMP003",
    title: "Compliance review pending",
    detail: "CMP003 · Transaction Monitoring",
  },
  {
    id: "CMP004",
    title: "Compliance review pending",
    detail: "CMP004 · Audit Trail",
  },
];

export default function DashboardPage() {
  const {
    reconciliationStatuses,
    exceptionStatuses,
    riskStatuses,
    complianceStatuses,
  } = useWorkflow();

  const getReconciliationStatus = (
    reconciliationId: string
  ) => {
    return (
      reconciliationStatuses[
        reconciliationId
      ] || "Unmatched"
    );
  };

  const getExceptionStatus = (
    exceptionId: string
  ) => {
    return (
      exceptionStatuses[exceptionId] ||
      "Open"
    );
  };

  const getRiskStatus = (
    riskId: string
  ) => {
    return (
      riskStatuses[riskId] ||
      "Open"
    );
  };

  const getComplianceStatus = (
    complianceId: string
  ) => {
    const defaultStatuses: Record<
      string,
      string
    > = {
      CMP001: "Pending Review",
      CMP002: "Approved",
      CMP003: "Pending Review",
      CMP004: "Rejected",
    };

    return (
      complianceStatuses[complianceId] ||
      defaultStatuses[complianceId] ||
      "Pending Review"
    );
  };

  /*
   * SETTLEMENT SUCCESS
   *
   * There are 5 reconciliation records.
   * Matched records represent successful settlement.
   */

  const totalReconciliations =
    reconciliationRecords.length;

  const matchedReconciliations =
    reconciliationRecords.filter(
      (record) =>
        getReconciliationStatus(
          record.id
        ) === "Matched"
    ).length;

  const settlementSuccess =
    totalReconciliations === 0
      ? "0.0"
      : (
          (matchedReconciliations /
            totalReconciliations) *
          100
        ).toFixed(1);

  /*
   * OPEN EXCEPTIONS
   */

  const openExceptions =
    exceptions.filter((exception) => {
      const status =
        getExceptionStatus(exception.id);

      return (
        status === "Open" ||
        status === "Under Review"
      );
    }).length;

  /*
   * HIGH RISK ALERTS
   */

  const highRiskAlerts =
    riskRecords.filter((risk) => {
      const status =
        getRiskStatus(risk.id);

      return status !== "Resolved";
    }).length;

  /*
   * RECENT ACTIVITY
   *
   * Only active items are displayed.
   */

  const recentActivities = [
    ...exceptions
      .filter((exception) => {
        const status =
          getExceptionStatus(
            exception.id
          );

        return status !== "Resolved";
      })
      .map((exception) => ({
        id: exception.id,
        title: exception.title,
        detail: exception.detail,
        href: `/exceptions/${exception.id}`,
      })),

    ...riskRecords
      .filter((risk) => {
        const status =
          getRiskStatus(risk.id);

        return status !== "Resolved";
      })
      .map((risk) => ({
        id: risk.id,
        title: risk.title,
        detail: risk.detail,
        href: `/risk/${risk.id}`,
      })),

    ...complianceRecords
      .filter((record) => {
        const status =
          getComplianceStatus(
            record.id
          );

        return (
          status === "Pending Review"
        );
      })
      .map((record) => ({
        id: record.id,
        title: record.title,
        detail: record.detail,
        href: `/compliance/${record.id}`,
      })),

    ...reconciliationRecords
      .filter((record) => {
        const status =
          getReconciliationStatus(
            record.id
          );

        return status !== "Matched";
      })
      .map((record) => ({
        id: record.id,
        title: "Unmatched transaction",
        detail: `${record.transaction} · Reconciliation`,
        href: `/reconciliation/${record.id}`,
      })),
  ];

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
              Payment operations overview and key operational alerts.
            </p>
          </div>

          {/* REFRESH DEMO */}

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-gray-50"
          >
            Refresh Demo
          </button>

        </div>

        {/* KPI CARDS */}

        <div className="grid grid-cols-4 gap-4">

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

              {recentActivities
                .slice(0, 4)
                .map((activity) => (
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
                ))}

              {recentActivities.length === 0 && (
                <p className="py-6 text-center text-sm text-gray-500">
                  No active operational alerts.
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
                    {settlementSuccess}%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-200">

                  <div
                    className="h-2 rounded-full bg-slate-900"
                    style={{
                      width: `${settlementSuccess}%`,
                    }}
                  />

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
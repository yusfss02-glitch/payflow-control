"use client";

import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const transactions = [
  { id: "TXN001", status: "Success" },
  { id: "TXN002", status: "Pending" },
  { id: "TXN003", status: "Exception" },
  { id: "TXN004", status: "Success" },
  { id: "TXN005", status: "Success" },
  { id: "TXN006", status: "Exception" },
];

const exceptions = [
  { id: "EXC001", status: "Open" },
  { id: "EXC002", status: "Under Review" },
  { id: "EXC003", status: "Resolved" },
  { id: "EXC004", status: "Open" },
];

const risks = [
  { id: "RISK001", level: "High", status: "Open" },
  { id: "RISK002", level: "Medium", status: "Open" },
  { id: "RISK003", level: "Medium", status: "Open" },
];

const compliance = [
  { id: "CMP001", status: "Pending Review" },
  { id: "CMP002", status: "Approved" },
  { id: "CMP003", status: "Pending Review" },
  { id: "CMP004", status: "Pending Review" },
];

const reconciliation = [
  { id: "REC001", status: "Matched" },
  { id: "REC002", status: "Under Review" },
  { id: "REC003", status: "Unmatched" },
  { id: "REC004", status: "Matched" },
  { id: "REC005", status: "Unmatched" },
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
    transactionStatuses,
    exceptionStatuses,
    riskStatuses,
    complianceStatuses,
    reconciliationStatuses,
  } = useWorkflow();

  const getTransactionStatus = (
    transaction: (typeof transactions)[number]
  ) =>
    transactionStatuses[transaction.id] ||
    transaction.status;

  const getExceptionStatus = (
    exception: (typeof exceptions)[number]
  ) =>
    exceptionStatuses[exception.id] ||
    exception.status;

  const getRiskStatus = (
    risk: (typeof risks)[number]
  ) =>
    riskStatuses[risk.id] ||
    risk.status;

  const getComplianceStatus = (
    record: (typeof compliance)[number]
  ) =>
    complianceStatuses[record.id] ||
    record.status;

  const getReconciliationStatus = (
    record: (typeof reconciliation)[number]
  ) =>
    reconciliationStatuses[record.id] ||
    record.status;

  /*
   * KPI 1
   * Transactions Today
   */
  const totalTransactions =
    transactions.length;

  /*
   * KPI 2
   * Settlement Success
   *
   * Success transactions /
   * total transactions
   */
  const successfulTransactions =
    transactions.filter(
      (transaction) =>
        getTransactionStatus(transaction) ===
        "Success"
    ).length;

  const settlementSuccess =
    totalTransactions === 0
      ? 0
      : (
          (successfulTransactions /
            totalTransactions) *
          100
        ).toFixed(1);

  /*
   * KPI 3
   * Open Exceptions
   *
   * Resolved exceptions are excluded.
   */
  const openExceptions =
    exceptions.filter((exception) => {
      const status =
        getExceptionStatus(exception);

      return (
        status === "Open" ||
        status === "Under Review"
      );
    }).length;

  /*
   * KPI 4
   * High Risk Alerts
   *
   * High-risk records that are not resolved.
   */
  const highRiskAlerts =
    risks.filter((risk) => {
      const status =
        getRiskStatus(risk);

      return (
        risk.level === "High" &&
        status !== "Resolved"
      );
    }).length;

  /*
   * Recent Activity
   *
   * Completed operational items disappear.
   */
  const visibleActivities =
    activities.filter((activity) => {
      if (activity.type === "exception") {
        return (
          getExceptionStatus({
            id: activity.id,
            status: "Open",
          }) !== "Resolved"
        );
      }

      if (activity.type === "risk") {
        return (
          getRiskStatus({
            id: activity.id,
            level: "High",
            status: "Open",
          }) !== "Resolved"
        );
      }

      if (activity.type === "compliance") {
        const status =
          getComplianceStatus({
            id: activity.id,
            status: "Pending Review",
          });

        return (
          status !== "Approved" &&
          status !== "Rejected"
        );
      }

      if (activity.type === "reconciliation") {
        return (
          getReconciliationStatus({
            id: activity.id,
            status: "Unmatched",
          }) !== "Matched"
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

          <Link
            href="/transactions"
            className="rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-sm text-gray-500">
              Transactions Today
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {totalTransactions}
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
              Successfully processed transactions
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
              High-risk indicators requiring attention
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

              {visibleActivities.length > 0 ? (
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
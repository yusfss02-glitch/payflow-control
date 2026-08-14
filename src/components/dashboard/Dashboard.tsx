"use client";

import Link from "next/link";
import Layout from "@/components/Layout";
import { useWorkflow } from "@/components/WorkflowContext";

const transactions = [
  {
    id: "TXN001",
    merchant: " StayBook",
    amount: "$1,250",
    status: "Success",
  },
  {
    id: "TXN002",
    merchant: " TripNest",
    amount: "$980",
    status: "Pending",
  },
  {
    id: "TXN003",
    merchant: "RoomLink",
    amount: "$2,430",
    status: "Exception",
  },
  {
    id: "TXN004",
    merchant: " TravelHub",
    amount: "$750",
    status: "Success",
  },
  {
    id: "TXN005",
    merchant: " BookStay",
    amount: "$1,890",
    status: "Success",
  },
  {
    id: "TXN006",
    merchant: " InnFinder",
    amount: "$560",
    status: "Exception",
  },
];

const riskRecords = [
  {
    id: "RISK001",
    level: "High",
    status: "Detected",
  },
  {
    id: "RISK002",
    level: "Medium",
    status: "Detected",
  },
  {
    id: "RISK003",
    level: "Medium",
    status: "Detected",
  },
];

const exceptions = [
  {
    id: "EXC001",
    transaction: "TXN003",
    merchant: "RoomLink",
    activity: "Settlement mismatch detected",
    status: "Open",
  },
  {
    id: "EXC002",
    transaction: "TXN006",
    merchant: "InnFinder",
    activity: "Payment exception requires review",
    status: "Under Review",
  },
  {
    id: "EXC003",
    transaction: "TXN002",
    merchant: "TripNest",
    activity: "Payment verification completed",
    status: "Resolved",
  },
  {
    id: "EXC004",
    transaction: "TXN001",
    merchant: "StayBook",
    activity: "Operational exception detected",
    status: "Open",
  },
];

export default function Dashboard() {
  const {
    transactionStatuses,
    riskStatuses,
    exceptionStatuses,
  } = useWorkflow();

  const getTransactionStatus = (
    transaction: (typeof transactions)[number]
  ) =>
    transactionStatuses[transaction.id] ||
    transaction.status;

  const getRiskStatus = (
    risk: (typeof riskRecords)[number]
  ) =>
    riskStatuses[risk.id] ||
    risk.status;

  const getExceptionStatus = (
    exception: (typeof exceptions)[number]
  ) =>
    exceptionStatuses[exception.id] ||
    exception.status;

  const totalTransactions = transactions.length;

  const successfulTransactions =
    transactions.filter(
      (transaction) =>
        getTransactionStatus(transaction) === "Success"
    ).length;

  const settlementSuccess =
    totalTransactions === 0
      ? 0
      : (
          (successfulTransactions /
            totalTransactions) *
          100
        ).toFixed(1);

  const openExceptions =
    exceptions.filter((exception) => {
      const currentStatus =
        getExceptionStatus(exception);

      return (
        currentStatus === "Open" ||
        currentStatus === "Under Review"
      );
    }).length;

  const highRiskAlerts =
    riskRecords.filter((risk) => {
      const currentStatus =
        getRiskStatus(risk);

      return (
        risk.level === "High" &&
        currentStatus !== "Mitigated"
      );
    }).length;

  /*
   * Only active exceptions appear in Recent Activity.
   * Once an exception becomes Resolved,
   * its activity disappears from the active dashboard feed.
   */
  const recentActivities = exceptions.filter(
    (exception) => {
      const currentStatus =
        getExceptionStatus(exception);

      return currentStatus !== "Resolved";
    }
  );

  return (
    <Layout>

      <div className="space-y-6">

        {/* PAGE HEADER */}

        <div>
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="mt-1 text-gray-500">
            Payment operations overview and monitoring.
          </p>
        </div>

        {/* KPI CARDS */}

        <div className="grid grid-cols-4 gap-4">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Transactions Today
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {totalTransactions}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Settlement Success
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {settlementSuccess}%
            </h3>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Open Exceptions
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {openExceptions}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              High Risk Alerts
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {highRiskAlerts}
            </h3>
          </div>

        </div>

        {/* RECENT ACTIVITY */}

        <div className="rounded-xl bg-white p-6 shadow">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-lg font-semibold">
                Recent Activity
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Active payment operations requiring attention.
              </p>
            </div>

            <Link
              href="/exceptions"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View Exceptions
            </Link>

          </div>

          <div className="mt-5 space-y-3">

            {recentActivities.length === 0 && (
              <div className="rounded-lg border border-dashed p-6 text-center">

                <p className="font-medium text-gray-700">
                  No active exceptions
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  All current operational exceptions have been resolved.
                </p>

              </div>
            )}

            {recentActivities.map((exception) => {

              const currentStatus =
                getExceptionStatus(exception);

              return (
                <Link
                  key={exception.id}
                  href={`/exceptions/${exception.id}`}
                  className="block rounded-lg border p-4 transition hover:bg-gray-50"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-medium text-blue-600">
                        {exception.activity}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {exception.transaction} ·{" "}
                        {exception.merchant}
                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        currentStatus === "Under Review"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {currentStatus}
                    </span>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

        {/* RECENT TRANSACTIONS */}

        <div className="rounded-xl bg-white p-6 shadow">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-lg font-semibold">
                Recent Transactions
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Latest payment activity across merchants.
              </p>
            </div>

            <Link
              href="/transactions"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View All
            </Link>

          </div>

          <div className="mt-5 overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b">

                  <th className="pb-3">
                    Transaction
                  </th>

                  <th className="pb-3">
                    Merchant
                  </th>

                  <th className="pb-3">
                    Amount
                  </th>

                  <th className="pb-3">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>

                {transactions
                  .slice(0, 5)
                  .map((transaction) => {

                    const currentStatus =
                      getTransactionStatus(
                        transaction
                      );

                    return (
                      <tr
                        key={transaction.id}
                        className="border-b last:border-0"
                      >

                        <td className="py-4 font-medium">

                          <Link
                            href={`/transactions/${transaction.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {transaction.id}
                          </Link>

                        </td>

                        <td>
                          {transaction.merchant}
                        </td>

                        <td>
                          {transaction.amount}
                        </td>

                        <td>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              currentStatus === "Success"
                                ? "bg-green-100 text-green-700"
                                : currentStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {currentStatus}
                          </span>

                        </td>

                      </tr>
                    );
                  })}

              </tbody>

            </table>

          </div>

        </div>

        {/* OPERATIONAL OVERVIEW */}

        <div className="grid grid-cols-2 gap-6">

          {/* EXCEPTIONS */}

          <div className="rounded-xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-semibold">
                Exceptions
              </h3>

              <Link
                href="/exceptions"
                className="text-sm text-blue-600 hover:underline"
              >
                View All
              </Link>

            </div>

            <div className="mt-5 space-y-3">

              {exceptions.map((exception) => {

                const currentStatus =
                  getExceptionStatus(
                    exception
                  );

                return (
                  <div
                    key={exception.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >

                    <Link
                      href={`/exceptions/${exception.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {exception.id}
                    </Link>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        currentStatus === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : currentStatus === "Under Review"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {currentStatus}
                    </span>

                  </div>
                );
              })}

            </div>

          </div>

          {/* RISK MONITORING */}

          <div className="rounded-xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">

              <h3 className="text-lg font-semibold">
                Risk Monitoring
              </h3>

              <Link
                href="/risk"
                className="text-sm text-blue-600 hover:underline"
              >
                View All
              </Link>

            </div>

            <div className="mt-5 space-y-3">

              {riskRecords.map((risk) => {

                const currentStatus =
                  getRiskStatus(risk);

                return (
                  <div
                    key={risk.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >

                    <Link
                      href={`/risk/${risk.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {risk.id}
                    </Link>

                    <div className="flex items-center gap-3">

                      <span
                        className={`text-sm font-semibold ${
                          risk.level === "High"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {risk.level}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          currentStatus === "Mitigated"
                            ? "bg-green-100 text-green-700"
                            : currentStatus === "Reviewing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {currentStatus}
                      </span>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}
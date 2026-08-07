import TransactionTable from "./TransactionTable";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">Transactions Today</p>
          <h3 className="mt-2 text-3xl font-bold">12,458</h3>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">Settlement Success</p>
          <h3 className="mt-2 text-3xl font-bold">98.7%</h3>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">Open Exceptions</p>
          <h3 className="mt-2 text-3xl font-bold">24</h3>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">High Risk Alerts</p>
          <h3 className="mt-2 text-3xl font-bold">7</h3>
        </div>
      </div>

      <TransactionTable />
    </div>
  );
}
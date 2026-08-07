export default function TransactionTable() {
  const transactions = [
    { id: "TXN001", merchant: "Hotel A", amount: "$1,250", status: "Success" },
    { id: "TXN002", merchant: "Hotel B", amount: "$980", status: "Pending" },
    { id: "TXN003", merchant: "Hotel C", amount: "$2,430", status: "Exception" },
    { id: "TXN004", merchant: "Hotel D", amount: "$750", status: "Success" },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="mb-4 text-xl font-semibold">Recent Transactions</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>ID</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="py-3">{t.id}</td>
              <td>{t.merchant}</td>
              <td>{t.amount}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
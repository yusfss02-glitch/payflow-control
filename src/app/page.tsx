import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="rounded-xl bg-white p-8 shadow">
        <h2 className="text-2xl font-semibold">
          Welcome to PayFlow Control
        </h2>

        <p className="mt-4 text-gray-600">
          Payment Operations, Risk & Reconciliation SaaS MVP
        </p>
      </div>
    </Layout>
  );
}
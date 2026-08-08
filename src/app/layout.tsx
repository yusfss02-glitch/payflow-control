import type { Metadata } from "next";
import "./globals.css";
import { WorkflowProvider } from "@/components/WorkflowContext";

export const metadata: Metadata = {
  title: "PayFlow Control",
  description: "Payment Operations, Risk & Reconciliation SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WorkflowProvider>
          {children}
        </WorkflowProvider>
      </body>
    </html>
  );
}
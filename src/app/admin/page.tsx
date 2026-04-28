import type { Metadata } from "next";
import AdminDashboard from "@/features/admin/components/AdminDashboard";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}

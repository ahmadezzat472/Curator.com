import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard" };

// These would be real API calls with your api() wrapper
// Shown as static for now — replace with real service calls
const STATS = [
  { label: "Total users", value: "2,543" },
  { label: "Total products", value: "847" },
  { label: "Orders today", value: "124" },
  { label: "Revenue today", value: "$8,320" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-4 space-y-1"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const NAV_LINKS = [
  { href: "/profile", label: "My Profile" },
  { href: "/orders", label: "My Orders" },
  { href: "/wishlist", label: "Wishlist" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Extra server-side guard (middleware is the first line of defense)
  // const token = (await cookies()).get("token")?.value;
  // if (!token) redirect("/login");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-56 shrink-0">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Page content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}

import Link from "next/link";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/categories", label: "Categories" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const role = cookies().get("role")?.value;
  // if (role !== "ADMIN") redirect("/");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r bg-card">
        <div className="p-4 border-b">
          <p className="text-sm font-semibold">Admin Panel</p>
        </div>
        <nav className="p-2 space-y-1">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center px-6">
          <p className="text-sm text-muted-foreground">Admin</p>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

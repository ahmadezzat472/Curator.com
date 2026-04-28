import Link from "next/link";

const VENDOR_LINKS = [
  { href: "/vendor", label: "Dashboard" },
  { href: "/vendor/products", label: "Products" },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r bg-card">
        <div className="p-4 border-b">
          <p className="text-sm font-semibold">Vendor Panel</p>
        </div>
        <nav className="p-2 space-y-1">
          {VENDOR_LINKS.map((link) => (
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

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center px-6">
          <p className="text-sm text-muted-foreground">Vendor</p>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

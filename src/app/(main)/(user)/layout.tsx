import { USER_LINK_PAGES } from "@/features/user/constants/link-pages";
import Link from "next/link";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // bg-neutral-50 fills the space between navbar and footer
    <div className="bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8 items-start">
        {/* ── Sidebar ── */}
        <aside className="w-56 shrink-0 sticky top-24">
          {/* User card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-4 mb-3 text-center">
            <div className="w-14 h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center text-lg font-bold mx-auto mb-2">
              JD
            </div>
            <p className="font-semibold text-sm text-neutral-900">John Doe</p>
            <p className="text-xs text-neutral-400 truncate">
              john@example.com
            </p>
          </div>

          {/* Nav links */}
          <nav className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            {USER_LINK_PAGES.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors border-b border-neutral-100 last:border-0"
              >
                <Icon className="w-4 h-4 text-neutral-400" />
                {label}
              </Link>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 transition-colors">
              {/* <LogOut className="w-4 h-4" /> */}
              Sign out
            </button>
          </nav>
        </aside>

        {/* ── Page content ── */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}

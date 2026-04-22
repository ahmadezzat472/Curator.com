import Link from "next/link";
import { cookies } from "next/headers";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

async function Header() {
  const username = (await cookies()).get("username")?.value;
  const isLoggedIn = !!(await cookies()).get("token")?.value;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="custom-container flex h-14 items-center gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg shrink-0"
        >
          ShopNow
        </Link>

        {/* Search — CLIENT: needs onChange/debounce */}
        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Right side */}
        <nav className="flex items-center gap-2 ml-auto">
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Products
          </Link>

          {/* Cart — CLIENT: needs cart count from React Query */}
          <CartButton />

          {/* User menu — CLIENT: needs logout mutation */}
          <UserMenu isLoggedIn={isLoggedIn} username={username} />
        </nav>
      </div>
    </header>
  );
}

export default Header;

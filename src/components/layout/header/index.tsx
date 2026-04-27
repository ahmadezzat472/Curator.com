import Link from "next/link";
import { cookies } from "next/headers";
// import CartButton from "./CartButton";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CartDrawer from "@/features/cart/components/CartDrawer";
import {  } from "@/lib/auth/cookies";
import { ACCESS_COOKIE } from "@/constants/CookiesKeys";

async function Header() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get(ACCESS_COOKIE)?.value;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="relative custom-container flex h-14 items-center gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg shrink-0"
        >
          ShopNow
        </Link>

        {/* Search — CLIENT: needs onChange/debounce */}
        <div className="flex-1 max-w-xs">
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
          <div className="hidden sm:block">
            {/* <CartButton /> */}
            <CartDrawer />
          </div>

          {/* User menu — CLIENT: needs logout mutation */}
          <UserMenu isLoggedIn={isLoggedIn} />
        </nav>
      </div>
    </header>
  );
}

export default Header;

// SERVER Component — pure static content, no interactivity
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="custom-container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold text-lg mb-2">ShopNow</p>
            <p className="text-sm text-muted-foreground">
              Your one-stop e-commerce destination.
            </p>
          </div>

          <div>
            <p className="font-medium text-sm mb-3">Shop</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/products"
                  className="hover:text-foreground transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?sort=newest"
                  className="hover:text-foreground transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/products?sort=rating"
                  className="hover:text-foreground transition-colors"
                >
                  Top Rated
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-sm mb-3">Account</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/profile"
                  className="hover:text-foreground transition-colors"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="hover:text-foreground transition-colors"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-foreground transition-colors"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-sm mb-3">Support</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ShopNow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

"use client";

import { useLogout } from "@/features/auth/hooks/useLogout";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiUser, FiLogOut, FiPackage, FiHeart } from "react-icons/fi";

type Props = {
  isLoggedIn: boolean;
  username?: string;
};

function UserMenu({ isLoggedIn, username }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutate: logout, isPending } = useLogout();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="text-sm font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 h-9 px-2 rounded-md hover:bg-accent transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
          <FiUser size={14} className="text-primary" />
        </div>
        <span className="text-sm font-medium hidden sm:block max-w-25 truncate">
          {username}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border bg-popover shadow-md py-1 z-50">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
            onClick={() => setOpen(false)}
          >
            <FiUser size={14} />
            My Profile
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
            onClick={() => setOpen(false)}
          >
            <FiPackage size={14} />
            My Orders
          </Link>
          <Link
            href="/wishlist"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
            onClick={() => setOpen(false)}
          >
            <FiHeart size={14} />
            Wishlist
          </Link>

          <div className="my-1 border-t" />

          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            disabled={isPending}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors"
          >
            <FiLogOut size={14} />
            {isPending ? "Logging out..." : "Log out"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;

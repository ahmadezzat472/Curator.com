"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { USER_LINK_PAGES } from "@/features/user/constants/link-pages";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

type Props = {
  isLoggedIn: boolean;
  username?: string;
};

function UserMenu({ isLoggedIn, username }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutate: logout, isPending } = useLogout();

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
    <div className="" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer w-8 h-8 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center group hover:bg-primary/20 transition-all"
      >
        <FiUser
          size={14}
          className="text-primary group-hover:font-bold transition-all"
        />
      </button>

      {open && (
        <div className="absolute right-4 top-full w-48 rounded-lg border bg-popover shadow-md py-1 z-50">
          <span className="text-sm font-medium text-center max-w-25 truncate">
            {username}
          </span>
          {USER_LINK_PAGES.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
              onClick={() => setOpen(false)}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}

          <div className="my-1 border-t" />

          <Button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            disabled={isPending}
            variant={"destructive"}
          >
            <FiLogOut size={14} />
            {isPending ? "Logging out..." : "Log out"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;

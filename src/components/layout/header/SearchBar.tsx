"use client";
// CLIENT: needs controlled input, debounce, useRouter for navigation

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";

function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  // const isFirstRender = useRef(true);
  const hasInteracted = useRef(false);

  // Debounce — push to URL 400ms after user stops typing
  useEffect(() => {
    // Ignore state changes that are not caused by direct user interaction.
    if (!hasInteracted.current) {
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmedValue = value.trim();

      if (trimmedValue) {
        params.set("q", trimmedValue);
      } else {
        params.delete("q");
      }
      params.delete("page");

      const query = params.toString();
      const target = query ? `/products?${query}` : "/products";
      if (pathname !== "/products" || query !== searchParams.toString()) {
        router.replace(target);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [pathname, router, searchParams, value]);

  return (
    <div className="relative">
      <FiSearch
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <Input
        type="search"
        placeholder="Search products..."
        value={value}
        onChange={(e) => {
          hasInteracted.current = true;
          setValue(e.target.value);
        }}
        className="pl-9 pr-8 h-9"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            hasInteracted.current = true;
            setValue("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <FiX size={14} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { buildUpdatedParams } from "@/lib/url-params";

export function useSetParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const qs = buildUpdatedParams(searchParams, key, value);
      router.push(`${pathname}?${qs}`);
    },
    [searchParams, router, pathname],
  );

  const clearAll = useCallback(() => router.push(pathname), [router, pathname]);

  const hasActiveFilters = useCallback(
    (...keys: string[]) => keys.some((k) => searchParams.has(k)),
    [searchParams],
  );

  return { setParam, clearAll, hasActiveFilters };
}

import { ReadonlyURLSearchParams } from "next/navigation";

export function buildUpdatedParams(
  searchParams: ReadonlyURLSearchParams,
  key: string,
  value: string,
): string {
  const params = new URLSearchParams(searchParams.toString());
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  params.delete("page");
  return params.toString();
}

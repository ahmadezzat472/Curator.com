import { ProductFilters } from "../types";

export const toParams = (filters?: ProductFilters): string => {
  if (!filters) return "";
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });
  const str = params.toString();

  return str ? `?${str}` : "";
};

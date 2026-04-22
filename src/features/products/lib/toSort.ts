import { SORT_VALUES } from "../constants/sortValues";
import { ProductFilters } from "../types";

export const toSort = (
  value: string | undefined,
): ProductFilters["sort"] | undefined => {
  if (!value) {
    return undefined;
  }

  return SORT_VALUES.includes(value as ProductFilters["sort"])
    ? (value as ProductFilters["sort"])
    : undefined;
};

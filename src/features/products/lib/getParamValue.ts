import { SearchParamValue } from "../types/ProductsSearchParams";

export const getParamValue = (value: SearchParamValue): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

export type SearchParamValue = string | string[] | undefined;

export type ProductsPageSearchParams = {
  q?: SearchParamValue;
  category?: SearchParamValue;
  minPrice?: SearchParamValue;
  maxPrice?: SearchParamValue;
  sort?: SearchParamValue;
  page?: SearchParamValue;
};

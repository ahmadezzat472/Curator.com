import {
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

export function useApiInfiniteQuery<TData>(
  queryKey: QueryKey,
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<TData>,
  queryOptions: Omit<
    UseInfiniteQueryOptions<TData, Error, TData, QueryKey, number>,
    "queryKey" | "queryFn" | "initialPageParam"
  > & {
    getNextPageParam: (
      lastPage: TData,
      allPages: TData[],
    ) => number | undefined;
  },
) {
  return useInfiniteQuery<TData, Error, TData, QueryKey, number>({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
    initialPageParam: 1,
    ...queryOptions,
  });
}

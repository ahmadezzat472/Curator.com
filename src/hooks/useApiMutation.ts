"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

type ApiMutationOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, Error, TVariables>,
  "mutationFn"
> & {
  mutationFn: (variables: TVariables) => Promise<TData>;
};

export function useApiMutation<TData = unknown, TVariables = unknown>({
  mutationFn,
  ...mutationOptions
}: ApiMutationOptions<TData, TVariables>) {
  return useMutation<TData, Error, TVariables>({
    mutationFn,
    ...mutationOptions,
  });
}

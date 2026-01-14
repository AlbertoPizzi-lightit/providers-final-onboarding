import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import type { UseQueryProps } from "@/services/types";
import type { getProviders } from "./api";
import { queries } from "./factories";
import type { ProviderRequestParams } from "./types";

export const useProviders = (
  params?: ProviderRequestParams,
  props?: UseQueryProps<typeof queries.list>,
) => {
  return useQuery({ ...queries.list(params), ...props });
};

export const useInfiniteProviders = (params?: Omit<ProviderRequestParams, "page">) => {
  return useInfiniteQuery({
    ...queries.infinite(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Awaited<ReturnType<typeof getProviders>>) => {
      const currentPage = lastPage.meta.currentPage;
      const lastPageNum = lastPage.meta.lastPage;

      return currentPage < lastPageNum ? currentPage + 1 : undefined;
    },
  });
};

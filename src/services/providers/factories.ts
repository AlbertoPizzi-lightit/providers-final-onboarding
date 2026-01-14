import { createQueryKeys } from "@lukemorales/query-key-factory";

import { getProviders } from "./api";

export const queries = createQueryKeys("providers", {
  list: (params?) => {
    return {
      queryKey: [params],
      queryFn: () => {
        return getProviders(params);
      },
    };
  },
  infinite: (params?) => {
    return {
      queryKey: [params],
      queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
        return getProviders({ ...params, page: pageParam });
      },
    };
  },
});

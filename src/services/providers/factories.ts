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
});

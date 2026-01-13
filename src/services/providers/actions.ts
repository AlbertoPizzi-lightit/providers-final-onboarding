import { useQuery } from "@tanstack/react-query";

import type { UseQueryProps } from "@/services/types";
import { queries } from "./factories";
import type { ProviderRequestParams } from "./types";

export const useProviders = (
  params?: ProviderRequestParams,
  props?: UseQueryProps<typeof queries.list>,
) => {
  return useQuery({ ...queries.list(params), ...props });
};

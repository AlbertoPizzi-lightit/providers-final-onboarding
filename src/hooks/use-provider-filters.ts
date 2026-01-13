import { getRouteApi } from "@tanstack/react-router";
import { z } from "zod";

import type { AvailableRoutesId } from "@/config/router";

export const providerFiltersValidation = z.object({
  name: z.string().optional(),
  specialty_id: z.string().optional(),
  gender: z.string().optional(),
  clinic_id: z.string().optional(),
});

export const useProviderFilters = (path: AvailableRoutesId) => {
  const { useNavigate, useSearch } = getRouteApi(path);

  const search = useSearch();
  const navigate = useNavigate();

  const filters = providerFiltersValidation.parse(search);

  const setFilter = (key: keyof typeof filters, value: string | undefined) => {
    navigate({
      search: (prev) => {
        return { ...prev, [key]: value };
      },
    });
  };

  const setFilters = (newFilters: Partial<typeof filters>) => {
    navigate({
      search: (prev) => {
        return { ...prev, ...newFilters };
      },
    });
  };

  const clearFilters = () => {
    navigate({
      search: (prev) => {
        return {
          ...prev,
          name: undefined,
          specialty_id: undefined,
          gender: undefined,
          clinic_id: undefined,
        };
      },
    });
  };

  return {
    actions: { setFilter, setFilters, clearFilters },
    filters,
  };
};

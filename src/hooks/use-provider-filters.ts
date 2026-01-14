import { getRouteApi } from "@tanstack/react-router";

import type { AvailableRoutesId } from "@/config/router";
import { providerFiltersValidation } from "@/services";

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

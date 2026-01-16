import { getRouteApi } from "@tanstack/react-router";

import { providerFiltersValidation, PROVIDERS_ROUTE_ID } from "@/services";

export const useProviderFilters = () => {
  const { useNavigate, useSearch } = getRouteApi(PROVIDERS_ROUTE_ID);

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

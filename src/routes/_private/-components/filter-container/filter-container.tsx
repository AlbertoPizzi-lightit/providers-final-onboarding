import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, DropdownMenu } from "@/components/ui";
import { useDebounce, useProviderFilters } from "@/hooks";
import {
  filterKeyMap,
  type FilterKeys,
  MenuOptions,
  PROVIDER_FILTER_KEYS,
  type Providers,
} from "@/services";
import { SearchIcon } from "../icons/search-icon";
import { defaultFilterNames } from "./constants";
import { getClinics, getGenders, getSpecialties } from "./functions";
import type { MenuDataType } from "./types";

type FilterContainerProps = {
  providers: Providers[];
};

export const FilterContainer = ({ providers }: FilterContainerProps) => {
  const { t } = useTranslation();
  const { actions, filters } = useProviderFilters();

  const [localSearchValue, setLocalSearchValue] = useState(filters.name ?? "");

  useEffect(() => {
    setLocalSearchValue(filters.name ?? "");
  }, [filters.name]);

  const debouncedSearchValue = useDebounce(localSearchValue, 200);

  useEffect(() => {
    actions.setFilter(PROVIDER_FILTER_KEYS.NAME, debouncedSearchValue || undefined);
  }, [debouncedSearchValue, actions]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);
  };

  const handleFilterChange = (
    selectedOption: { id?: string | number; label: string },
    filterName: FilterKeys,
  ) => {
    const filterKey = filterKeyMap[filterName];
    const currentValue = filters[filterKey];

    if (
      selectedOption.label === defaultFilterNames[filterName] ||
      String(selectedOption.id) === currentValue
    ) {
      actions.setFilter(filterKey, undefined);
    } else if (selectedOption.id !== undefined) {
      actions.setFilter(filterKey, String(selectedOption.id));
    } else {
      actions.setFilter(filterKey, selectedOption.label.toLowerCase());
    }
  };

  const clinics = getClinics(
    providers.flatMap((data) => {
      return data.clinics;
    }),
  );

  const specialties = getSpecialties(
    providers.map((data) => {
      return { id: data.specialty.id, name: data.specialty.name };
    }),
  );

  const genders = getGenders(
    providers.map((data) => {
      return data.gender;
    }),
  );

  const getCheckedOptions = (options: typeof clinics, filterKey: FilterKeys) => {
    const currentFilter = filters[filterKeyMap[filterKey]];

    return options.map((option) => {
      if (option.label === defaultFilterNames[filterKey]) {
        return { ...option, checked: !currentFilter };
      }
      const isChecked =
        String(option.id) === String(currentFilter) ||
        option.label.toLowerCase() === String(currentFilter).toLowerCase();

      return {
        ...option,
        checked:
          (isChecked && String(option.label)?.toLowerCase() === currentFilter?.toLowerCase()) ||
          String(option.id) === currentFilter,
      };
    });
  };

  const getFilterDisplayName = (filterName: FilterKeys, options: typeof clinics) => {
    const currentFilterId = filters[filterKeyMap[filterName]];

    if (!currentFilterId) {
      return defaultFilterNames[filterName];
    }

    const selectedOption = options.find((option) => {
      return (
        String(option.id) === String(currentFilterId) ||
        option.label.toLowerCase() === String(currentFilterId).toLowerCase()
      );
    });

    return selectedOption?.label || defaultFilterNames[filterName];
  };

  const menuData: MenuDataType = {
    specialties: {
      name: MenuOptions.specialties,
      options: getCheckedOptions(specialties, MenuOptions.specialties),
      filterData: handleFilterChange,
    },
    genders: {
      name: MenuOptions.genders,
      options: getCheckedOptions(genders, MenuOptions.genders),
      filterData: handleFilterChange,
    },
    clinics: {
      name: MenuOptions.clinics,
      options: getCheckedOptions(clinics, MenuOptions.clinics),
      filterData: handleFilterChange,
    },
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <SearchIcon className="absolute top-2 left-3 size-5 text-disabled-text" />
        <input
          className="focus:ring-primary/60 focus:border-primary/60 w-full rounded-md border border-border px-3 py-2 ps-10 text-sm placeholder:text-gray-400 focus:ring-2 focus:outline-none"
          id="searchProviders"
          name="searchProviders"
          onChange={handleSearch}
          placeholder={t("providers.filterContainer.searchPlaceholder")}
          type="text"
          value={localSearchValue}
        />
      </div>

      <div className="flex flex-wrap gap-5 pt-5 sm:gap-1">
        {Object.values(menuData).map((data, index) => {
          return (
            <div
              className="relative w-full min-w-70 overflow-hidden md:max-w-[70px]"
              key={data.name + index}
            >
              <DropdownMenu.Root>
                <DropdownMenu.Trigger
                  className="flex w-full items-center justify-between overflow-hidden rounded-lg border border-border bg-base-background p-3 text-base-text shadow-sm focus:ring-2 focus:ring-disabled-text focus:outline-none disabled:bg-disabled-text"
                  asChild
                >
                  <Button
                    aria-label={
                      t("providers.aria.dropdownMenu") +
                      getFilterDisplayName(data.name, data.options)
                    }
                    className="ml-auto"
                    variant="outlined"
                  >
                    {getFilterDisplayName(data.name, data.options)}
                  </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="end" className="w-full text-ellipsis">
                  {data.options.map((option, index) => {
                    return (
                      <DropdownMenu.CheckboxItem
                        checked={option.checked}
                        className="w-full capitalize"
                        key={option.label + index}
                        onCheckedChange={() => {
                          data.filterData(option, data.name);
                        }}
                      >
                        {option.label}
                      </DropdownMenu.CheckboxItem>
                    );
                  })}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          );
        })}
      </div>
    </div>
  );
};

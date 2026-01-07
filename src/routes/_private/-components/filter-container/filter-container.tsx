import { type ChangeEvent, useState } from "react";

import { Button, DropdownMenu } from "@/components/ui";
import { SearchIcon } from "../icons/search-icon";
import { defaultAllOption, defaultFilterNames, selectedFilters } from "./constants";
import { getClinics, getGenders, getSpecialties } from "./functions";
import type { FilterContainerProps, FilterKeys, MenuDataType, SelectedFilter } from "./types";

export const FilterContainer = ({
  providerBannerInfo,
  setProviderBannerInfo,
}: FilterContainerProps) => {
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>(selectedFilters);

  const [searchValue, setSearchValue] = useState("");

  const applyFilters = (search: string, filters: SelectedFilter) => {
    if (!providerBannerInfo) {
      return [];
    }

    return providerBannerInfo.filter((item) => {
      const matchesSearch = item.doctorName.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialty =
        filters.specialties.label === defaultAllOption.allSpecialties ||
        item.doctorSpecialty === filters.specialties.label;

      const matchesGender =
        filters.genders.label === defaultAllOption.allGenders ||
        item.gender === filters.genders.label.toLowerCase();

      const matchesClinic =
        filters.clinics.label === defaultAllOption.allClinics ||
        item.medicalCenter === filters.clinics.label;

      return matchesSearch && matchesSpecialty && matchesGender && matchesClinic;
    });
  };

  const filterFunction = (selectedOption: string, filterName: FilterKeys) => {
    const nextFilters = {
      ...selectedFilter,
      [filterName]: { option: selectedOption },
    };

    setSelectedFilter(nextFilters);

    const newFilteredData = applyFilters(searchValue, nextFilters);
    setProviderBannerInfo(newFilteredData);
  };

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setSearchValue(value);

    const newFilteredData = applyFilters(value, selectedFilter);
    setProviderBannerInfo(newFilteredData);
  };

  const clinics = getClinics(
    providerBannerInfo.flatMap((data) => {
      return data.clinics;
    }),
  );

  const specialties = getSpecialties(
    providerBannerInfo.flatMap((data) => {
      return data.doctorSpecialty;
    }),
  );

  const genders = getGenders(
    providerBannerInfo.flatMap((data) => {
      return data.gender;
    }),
  );

  const menuData: MenuDataType = {
    specialties: {
      name: "specialties",
      options: specialties,
      filterData: filterFunction,
    },

    genders: {
      name: "genders",
      options: genders,
      filterData: filterFunction,
    },

    clinics: {
      name: "clinics",
      options: clinics,
      filterData: filterFunction,
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
          placeholder="Search providers by name..."
          type="text"
        />
      </div>

      <div className="flex flex-wrap gap-5 pt-5 sm:gap-1">
        {Object.values(menuData).map((data, index) => {
          return (
            <div className="relative w-full min-w-70 md:max-w-[70px]" key={data.name + index}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-base-background p-3 text-base-text shadow-sm focus:ring-2 focus:ring-disabled-text focus:outline-none disabled:bg-disabled-text"
                  asChild
                >
                  <Button className="ml-auto" variant="outlined">
                    {defaultFilterNames[data.name]}
                  </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="end" className="w-full">
                  {data.options.map((option) => {
                    return (
                      <DropdownMenu.CheckboxItem
                        checked={option.checked}
                        className="w-full capitalize"
                        key={option.label}
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

import { type ChangeEvent, useState } from "react";

import { DropdownMenu } from "../dropdown-menu";
import { SearchIcon } from "../icons/search-icon";
import { defaultAllOption, selectedFilters } from "./constants";
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
        filters.specialties.option === defaultAllOption.allSpecialties ||
        item.doctorSpecialty === filters.specialties.option;

      const matchesGender =
        filters.genders.option === defaultAllOption.allGenders ||
        item.gender === filters.genders.option.toLowerCase();

      const matchesClinic =
        filters.clinics.option === defaultAllOption.allClinics ||
        item.medicalCenter === filters.clinics.option;

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
        <SearchIcon className="text-disabled-text absolute top-2 left-3 size-5" />
        <input
          className="border-border focus:ring-primary/60 focus:border-primary/60 w-full rounded-md border px-3 py-2 ps-10 text-sm placeholder:text-gray-400 focus:ring-2 focus:outline-none"
          id="searchProviders"
          name="searchProviders"
          onChange={handleSearch}
          placeholder="Search providers by name..."
          type="text"
        />
      </div>

      <div className="flex flex-wrap gap-5 pt-5 sm:gap-1">
        {Object.values(menuData).map((data, index) => {
          return <DropdownMenu {...data} key={data.name + index} />;
        })}
      </div>
    </div>
  );
};

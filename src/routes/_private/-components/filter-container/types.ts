import type { Dispatch, SetStateAction } from "react";

import type { ProviderBanner } from "../../page";

export type FilterContainerProps = {
  providerBannerInfo: ProviderBanner[];
  setProviderBannerInfo: Dispatch<SetStateAction<ProviderBanner[] | null>>;
  filteredProviderBannerInfo: ProviderBanner[] | null;
};

export type FilterKeys = "specialties" | "genders" | "clinics";

export type SelectedFilter = Record<
  FilterKeys,
  {
    option: string;
  }
>;

export type MenuDataValues = {
  name: FilterKeys;
  options: string[];
  filterData: (selectedSpecialty: string, filterName: FilterKeys) => void;
};

export type MenuDataType = Record<FilterKeys, MenuDataValues>;

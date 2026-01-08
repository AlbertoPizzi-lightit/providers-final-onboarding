export type FilterKeys = "specialties" | "genders" | "clinics";

export type SelectedFilter = Record<
  FilterKeys,
  {
    label: string;
    checked: boolean;
  }
>;

export type MenuDataValues = {
  name: FilterKeys;
  options: ProvidersDropdownOptionsType;
  filterData: (selectedSpecialty: string, filterName: FilterKeys) => void;
};

export type MenuDataType = Record<FilterKeys, MenuDataValues>;

export type ProvidersDropdownOptionsType = DropdownOptionsType[];

export type DropdownOptionsType = { label: string; checked: boolean };

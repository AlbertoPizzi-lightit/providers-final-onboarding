import { uppercaseFirstLetter } from "@/utils";
import { selectedFilters } from "./constants";
import type { ProvidersDropdownOptionsType } from "./types";

type WithIdAndName = {
  id: number;
  name: string;
};

type ReturnMapUniqueById = Array<{ id: number; label: string; checked: false }>;

type ReturnMapUniqueStrings = Array<{ label: string; checked: false }>;

const mapUniqueById = <T extends WithIdAndName>(items: T[]): ReturnMapUniqueById => {
  return Array.from(
    new Map(
      items.map((item) => {
        return [item.id, item];
      }),
    ).values(),
  ).map(({ id, name }) => {
    return {
      id,
      label: name,
      checked: false,
    };
  });
};

const mapUniqueStrings = (
  items: string[],
  formatLabel: (value: string) => string = (v) => {
    return v;
  },
): ReturnMapUniqueStrings => {
  return Array.from(new Set(items)).map((value) => {
    return {
      label: formatLabel(value),
      checked: false,
    };
  });
};

type MapResultOptions = ReturnMapUniqueById | ReturnMapUniqueStrings;

const mappedDropdownOptions = (
  defaultOption: { label: string; checked: boolean },
  mappedData: MapResultOptions,
): ProvidersDropdownOptionsType => {
  return [defaultOption, ...mappedData];
};

export const getClinics = (clinics: WithIdAndName[]): ProvidersDropdownOptionsType => {
  return mappedDropdownOptions(selectedFilters.clinics, mapUniqueById(clinics));
};

export const getSpecialties = (specialties: WithIdAndName[]): ProvidersDropdownOptionsType => {
  return mappedDropdownOptions(selectedFilters.specialties, mapUniqueById(specialties));
};

export const getGenders = (genders: string[]): ProvidersDropdownOptionsType => {
  return mappedDropdownOptions(
    selectedFilters.genders,
    mapUniqueStrings(genders, uppercaseFirstLetter),
  );
};

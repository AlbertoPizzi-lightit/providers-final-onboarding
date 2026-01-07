import { type Clinic, uppercaseFirstLetter } from "@/utils";
import { selectedFilters } from "./constants";
import type { ProvidersDropdownOptionsType } from "./types";

export const getClinics = (clinics: Clinic[]): ProvidersDropdownOptionsType => {
  const availableClinics = clinics.map(({ name }) => {
    return { label: name, checked: false };
  });

  const uniqueClinics = [selectedFilters.clinics, ...new Set(availableClinics)];

  return uniqueClinics;
};

export const getSpecialties = (specialties: string[]): ProvidersDropdownOptionsType => {
  const mappedSpecialties = specialties.map((specialty) => {
    return { label: specialty, checked: false };
  });
  const uniqueSpecialties = [selectedFilters.specialties, ...new Set(mappedSpecialties)];

  return uniqueSpecialties;
};

export const getGenders = (genders: string[]): ProvidersDropdownOptionsType => {
  const mappedGenders = genders.map((gender) => {
    return { label: uppercaseFirstLetter(gender), checked: false };
  });

  const uniqueGenders = [selectedFilters.genders, ...new Set(mappedGenders)];

  return uniqueGenders;
};

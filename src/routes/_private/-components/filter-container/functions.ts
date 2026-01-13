import { uppercaseFirstLetter } from "@/utils";
import { selectedFilters } from "./constants";
import type { ProvidersDropdownOptionsType } from "./types";

export const getClinics = (
  clinics: Array<{ id: number; name: string }>,
): ProvidersDropdownOptionsType => {
  const uniqueClinicsMap = new Map<number, { id: number; name: string }>();

  clinics.forEach((clinic) => {
    if (!uniqueClinicsMap.has(clinic.id)) {
      uniqueClinicsMap.set(clinic.id, clinic);
    }
  });

  const uniqueClinics = Array.from(uniqueClinicsMap.values()).map((clinic) => {
    return { id: clinic.id, label: clinic.name, checked: false };
  });

  return [selectedFilters.clinics, ...uniqueClinics];
};

export const getSpecialties = (
  specialties: Array<{ id: number; name: string }>,
): ProvidersDropdownOptionsType => {
  const uniqueSpecialtiesMap = new Map<number, { id: number; name: string }>();

  specialties.forEach((specialty) => {
    if (!uniqueSpecialtiesMap.has(specialty.id)) {
      uniqueSpecialtiesMap.set(specialty.id, specialty);
    }
  });

  const uniqueSpecialties = Array.from(uniqueSpecialtiesMap.values()).map((specialty) => {
    return { id: specialty.id, label: specialty.name, checked: false };
  });

  return [selectedFilters.specialties, ...uniqueSpecialties];
};

export const getGenders = (genders: string[]): ProvidersDropdownOptionsType => {
  const uniqueGenders = Array.from(new Set(genders)).map((gender) => {
    return { label: uppercaseFirstLetter(gender), checked: false };
  });

  return [selectedFilters.genders, ...uniqueGenders];
};

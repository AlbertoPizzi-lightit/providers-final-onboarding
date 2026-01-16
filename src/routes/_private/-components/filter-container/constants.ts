import type { SelectedFilter } from "./types";

export const defaultAllOption = {
  allClinics: "All Clinics",
  allSpecialties: "All Specialties",
  allGenders: "All Genders",
} as const;

export const selectedFilters: SelectedFilter = {
  specialties: { label: defaultAllOption.allSpecialties, checked: false },
  clinics: { label: defaultAllOption.allClinics, checked: false },
  genders: { label: defaultAllOption.allGenders, checked: false },
};

export const defaultFilterNames = {
  clinics: defaultAllOption.allClinics,
  specialties: defaultAllOption.allSpecialties,
  genders: defaultAllOption.allGenders,
} as const;

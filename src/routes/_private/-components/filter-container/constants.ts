import type { SelectedFilter } from "./types";

export const defaultAllOption = {
  allClinics: "All Clinics",
  allSpecialties: "All Specialties",
  allGenders: "All Genders",
} as const;

export const selectedFilters: SelectedFilter = {
  specialties: { option: defaultAllOption.allSpecialties },
  clinics: { option: defaultAllOption.allClinics },
  genders: { option: defaultAllOption.allGenders },
};

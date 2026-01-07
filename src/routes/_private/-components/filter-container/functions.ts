import { type Clinic, uppercaseFirstLetter } from "@/utils";
import { defaultAllOption } from "./constants";

export const getClinics = (clinics: Clinic[]): string[] => {
  const availableClinics: string[] = clinics.map(({ name }) => {
    return name;
  });

  const uniqueClinics = [defaultAllOption.allClinics, ...new Set(availableClinics)];

  return uniqueClinics;
};

export const getSpecialties = (specialties: string[]): string[] => {
  const uniqueSpecialties = [defaultAllOption.allSpecialties, ...new Set(specialties)];

  return uniqueSpecialties;
};

export const getGenders = (genders: string[]): string[] => {
  const uniqueGenders = [defaultAllOption.allGenders, ...new Set(genders)];

  return uniqueGenders.map((gender) => {
    return uppercaseFirstLetter(gender);
  });
};

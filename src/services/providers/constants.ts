import type { FilterKeys } from "./types";

export const PROVIDER_FILTER_KEYS = {
  NAME: "name",
  SPECIALTY_ID: "specialty_id",
  GENDER: "gender",
  CLINIC_ID: "clinic_id",
} as const;

export type providerFilterKeys = (typeof PROVIDER_FILTER_KEYS)[keyof typeof PROVIDER_FILTER_KEYS];

export const filterKeyMap: Record<FilterKeys, providerFilterKeys> = {
  specialties: PROVIDER_FILTER_KEYS.SPECIALTY_ID,
  genders: PROVIDER_FILTER_KEYS.GENDER,
  clinics: PROVIDER_FILTER_KEYS.CLINIC_ID,
};

export const MenuOptions = {
  specialties: "specialties",
  genders: "genders",
  clinics: "clinics",
} as const;

export const Gender = {
  Female: "female",
  Male: "male",
  Other: "other",
} as const;

export const PROVIDERS_ROUTE_ID = "/_private/" as const;

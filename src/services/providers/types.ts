import type z from "zod";

import type { getProvidersSchema } from "./schemas";

export type Providers = z.infer<ReturnType<typeof getProvidersSchema>>;

export type FilterKeys = "specialties" | "genders" | "clinics";

export type Clinic = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
};

export const Gender = {
  Female: "female",
  Male: "male",
  Other: "other",
} as const;

export type Specialty = {
  id: number;
  name: string;
};

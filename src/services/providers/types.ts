import type z from "zod";

import type { RequestParams } from "@/services/types";
import type { PROVIDER_FILTER_KEYS } from "./constants";
import type { getProvidersSchema } from "./schemas";

export type Providers = z.infer<ReturnType<typeof getProvidersSchema>>;

export type FilterKeys = "specialties" | "genders" | "clinics";

export type ProviderFilterKey = (typeof PROVIDER_FILTER_KEYS)[keyof typeof PROVIDER_FILTER_KEYS];

export type ProviderRequestParams = RequestParams<Record<ProviderFilterKey, string | undefined>>;

export type Clinic = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
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

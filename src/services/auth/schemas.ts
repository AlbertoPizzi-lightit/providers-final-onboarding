import { z } from "zod";

import i18n from "@/i18n";

export const getLoginPayloadSchema = () => {
  return z.object({
    email: z.email({
      message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }),
    }),
    password: z.string().min(6, {
      message: i18n.t("form.errors.minLength", { field: i18n.t("form.password"), length: 6 }),
    }),
    fullName: z.string().min(1, {
      message: i18n.t("form.errors.minLength", { field: i18n.t("form.fullName"), length: 1 }),
    }),
  });
};

export const loginResponseSchema = z.object({
  authToken: z.string(),
});

export const getSignupPayloadSchema = () => {
  return z.object({
    email: z.email({
      message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }),
    }),
    password: z.string().min(6, {
      message: i18n.t("form.errors.minLength", { field: i18n.t("form.password"), length: 6 }),
    }),
    fullName: z.string().min(1, {
      message: i18n.t("form.errors.minLength", { field: i18n.t("form.fullName"), length: 1 }),
    }),
  });
};

export const signupResponseSchema = z.object({
  authToken: z.string(),
});

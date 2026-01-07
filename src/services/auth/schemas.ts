import { z } from "zod";

import i18n from "@/i18n";

export const getLoginPayloadSchema = () => {
  return z.object({
    email: z.email({
      message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }),
    }),
    password: z.string().nonempty({
      message: i18n.t("login.errors.emptyPassword", { field: i18n.t("form.password") }),
    }),
  });
};

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

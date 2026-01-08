import { z } from "zod";

import i18n from "@/i18n";

export const getProvidersSchema = () => {
  return z.object({
    id: z.number(),
    name: z.string(),
    emailAddress: z.email({
      message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }),
    }),
  });
};

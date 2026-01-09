import { z } from "zod";

import { Gender } from "./types";

export const getProvidersSchema = () => {
  return z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.enum(Object.keys(Gender)),
    about: z.string(),
    languages: z.array(z.string()),
    profile_pic: z.string(),
    specialty: z.object({ id: z.number, name: z.string() }),
    clinics: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        zip_code: z.string(),
        phone: z.string(),
      }),
    ),
  });
};

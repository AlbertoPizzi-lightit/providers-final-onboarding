import { z } from "zod";

import { Gender } from "./constants";

export const getProvidersSchema = () => {
  return z
    .object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      gender: z.enum(Object.values(Gender)),
      about: z.string(),
      languages: z.array(z.string()),
      profile_pic: z.string(),
      specialty: z.object({ id: z.number(), name: z.string() }),
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
    })
    .transform((val) => {
      return {
        id: val.id,
        name: val.name,
        email: val.email,
        phone: val.phone,
        gender: val.gender,
        about: val.about,
        languages: val.languages,
        profilePic: val.profile_pic,
        specialty: {
          id: val.specialty.id,
          name: val.specialty.name,
        },
        clinics: val.clinics.map((clinic) => {
          return {
            id: clinic.id,
            name: clinic.name,
            address: clinic.address,
            city: clinic.city,
            state: clinic.state,
            zipCode: clinic.zip_code,
            phone: clinic.phone,
          };
        }),
      };
    });
};

export const parseProvidersResponse = (response: unknown) => {
  return getProvidersSchema().parse(response);
};

export const providerFiltersValidation = z.object({
  name: z.string().optional(),
  specialty_id: z.string().optional(),
  gender: z.string().optional(),
  clinic_id: z.string().optional(),
});

import { z } from "zod";

const paginatedResponseSchema = z.object({
  meta: z
    .object({
      last_page: z.number(),
      per_page: z.number(),
      total: z.number(),
      current_page: z.number(),
    })
    .transform((val) => {
      return {
        lastPage: val.last_page,
        perPage: val.per_page,
        total: val.total,
        currentPage: val.current_page,
      };
    }),
});

export const parsePaginatedResponse = <T>(schema: z.ZodType<T>, response: unknown) => {
  return paginatedResponseSchema.extend({ data: schema }).parse(response);
};

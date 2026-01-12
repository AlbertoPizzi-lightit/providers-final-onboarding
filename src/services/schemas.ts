import { z } from "zod";

const paginatedResponseSchema = z.object({
  meta: z
    .object({
      last_page: z.number(),
      per_page: z.number(),
      total: z.number(),
      current_page: z.number(),
      links: z.array(
        z.object({
          active: z.boolean(),
          label: z.string().nullable(),
          page: z.number().nullable(),
          url: z.string().nullable(),
        }),
      ),
      from: z.number(),
      to: z.number(),
      path: z.string(),
    })
    .transform((val) => {
      return {
        lastPage: val.last_page,
        perPage: val.per_page,
        total: val.total,
        currentPage: val.current_page,
        links: val.links,
        from: val.from,
        to: val.to,
        path: val.path,
      };
    }),
  links: z.object({
    first: z.string().nullable(),
    last: z.string().nullable(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
});

export const parsePaginatedResponse = <T>(schema: z.ZodType<T>, response: unknown) => {
  return paginatedResponseSchema.extend({ data: schema }).parse(response);
};

import type { z } from "zod";

import type { getLoginPayloadSchema, loginResponseSchema, signupResponseSchema } from "./schemas";

export type LoginPayload = z.infer<ReturnType<typeof getLoginPayloadSchema>>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type SignupResponse = z.infer<typeof signupResponseSchema>;

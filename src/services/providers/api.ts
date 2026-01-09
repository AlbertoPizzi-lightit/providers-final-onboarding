import z from "zod";

import { privateApi } from "@/config/api";
import type { ServiceResponse } from "../auth";
import { parsePaginatedResponse } from "../schemas";
import { getProvidersSchema } from "./schemas";
import type { Providers } from "./types";

export const getProviders = async (params?: Providers) => {
  const response = await privateApi.get<ServiceResponse<Providers>>("providers", { params });

  return parsePaginatedResponse(z.array(getProvidersSchema()), response.data);
};

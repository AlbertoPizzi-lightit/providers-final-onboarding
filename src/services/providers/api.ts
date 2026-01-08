import z from "zod";

import { privateApi } from "@/config/api";
import { parsePaginatedResponse } from "../schemas";
import { getProvidersSchema } from "./schemas";

export const getProviders = async (params?: unknown) => {
  const response = await privateApi.get("providers", { params });

  return parsePaginatedResponse(z.array(getProvidersSchema()), response.data);
};

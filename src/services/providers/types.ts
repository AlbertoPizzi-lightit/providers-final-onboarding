import type { z } from "zod";

import type { getLoginPayloadSchema, loginResponseSchema } from "./schemas";

export type LoginPayload = z.infer<ReturnType<typeof getLoginPayloadSchema>>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type ServiceResponse<T> = {
  transitional: Transitional;
  adapter: string[];
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  headers: Headers;
  baseURL: string;
  method: string;
  url: string;
  data: T;
  allowAbsoluteUrls: boolean;
};

export type Headers = {
  accept: string;
  contentType: string;
};

export type Transitional = {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
};

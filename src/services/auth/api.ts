import { publicApi } from "@/config/api";
import type { LoginPayload, LoginResponse } from "./types";

export const login = ({ email, password }: LoginPayload) => {
  return publicApi.post<LoginResponse>("auth/login", { email, password });
};

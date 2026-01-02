import { publicApi } from "@/config/api";
import type { LoginPayload, SignupResponse } from "./types";

export const login = ({ email, password }: LoginPayload) => {
  return Promise.resolve({
    data: { authToken: `super-encrypted-auth-token-for-${email}-${password}` },
  });
  // return publicApi.post<ServiceResponse<LoginResponse>>('auth/login', { email, password });
};

export const signup = ({ email, password }: LoginPayload) => {
  return publicApi.post<SignupResponse>("auth/signup", { email, password });
};

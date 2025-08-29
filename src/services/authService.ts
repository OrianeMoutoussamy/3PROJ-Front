import { apiClient } from "./apiClient";
import { LoginPayload, RegisterPayload } from "../models/auth/User";
import { AuthResponse } from "../models/auth/AuthResponse";

export const authService = {
  register: (payload: RegisterPayload): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>("/v1/auth/register", payload),

  login: (payload: LoginPayload): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>("/v1/auth/login", payload),

  logout: (): Promise<void> =>
    apiClient.post<void>("/v1/auth/logout"),
};

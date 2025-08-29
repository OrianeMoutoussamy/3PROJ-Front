// services/authService.ts
import { apiClient } from "./apiClient";

export interface AuthPayload {
  username?: string;
  password?: string;
}

export const authService = {
  register: (payload: AuthPayload) =>
    apiClient("/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload: AuthPayload) =>
    apiClient("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: () =>
    apiClient("/v1/auth/logout", {
      method: "POST",
    }),
};

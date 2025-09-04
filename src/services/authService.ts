import { apiClient } from "./apiClient";
import { LoginPayload, RegisterPayload } from "../models/auth/User";
import { AuthResponse } from "../models/auth/AuthResponse";

export const authService = {
  register: (payload: RegisterPayload): Promise<AuthResponse> => {
    console.log("[AuthService] Register payload:", payload);
    return apiClient.post<AuthResponse>("/v1/auth/register", payload);
  },

  login: (payload: LoginPayload): Promise<AuthResponse> => {
    console.log("[AuthService] Login payload:", payload);
    return apiClient.post<AuthResponse>("/v1/auth/login", payload);
  },
  
  logout: (): Promise<void> => {
    console.log("[AuthService] Logout called");
    return apiClient.post<void>("/v1/auth/logout");
  },
};

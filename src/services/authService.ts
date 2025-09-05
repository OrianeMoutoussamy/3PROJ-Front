import { apiClient } from "./apiClient";
import { LoginPayload, RegisterPayload } from "../models/auth/User";
import { AuthResponse } from "../models/auth/AuthResponse";

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>("/v1/auth/register", payload);
    sessionStorage.setItem("authToken", res.toString());
    return res;
  },

  login: async (payload: LoginPayload): Promise<string> => {
    const res = await apiClient.post<string>("/v1/auth/login", payload);
    sessionStorage.setItem("authToken", res.toString());
    return res;
  },
  
  logout: async (): Promise<void> => {
    const token = sessionStorage.getItem("authToken");
    const headers = token ? { headers: { Token: token } } : {};
    try {
      await apiClient.post<void>("/v1/auth/logout", null, headers);
    } catch (err) {
      console.error("Erreur lors du logout", err);
    } finally {
      sessionStorage.removeItem("authToken");
    }
  }
};

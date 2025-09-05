import { Channel } from "../models/channels/Channel";
import { apiClient } from "./apiClient";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("authToken");
  return token ? { headers: { Token: token } } : {};
};

export const channelService = {
  getSelf: async (): Promise<Channel> => {
    const headers = getAuthHeaders();
    const res = await apiClient.get<Channel>("/v1/channel", headers);
    return res;
  },

  getById: async (id: string | number): Promise<Channel> => {
    const headers = getAuthHeaders();
    const res = await apiClient.get<Channel>(`/v1/channel/${id}`, headers);
    return res;
  },

  getSubscribedChannels: async (): Promise<Channel[]> => {
    const headers = getAuthHeaders();
    const res = await apiClient.get<Channel[]>("/v1/channel/subscribed", headers);
    return res;
  },

  updateChannel: async (body: Partial<Channel>): Promise<Channel> => {
    const headers = getAuthHeaders();
    const res = await apiClient.put<Channel>("/v1/channel", body, headers);
    return res;
  },

  deleteChannel: async (): Promise<void> => {
    const headers = getAuthHeaders();
    const res = await apiClient.delete<void>("/v1/channel", headers);
    return res;
  },

  subscribe: async (id: string | number): Promise<void> => {
    const headers = getAuthHeaders();
    const res = await apiClient.post<void>(`/v1/channel/s/${id}`, null, headers);
    return res;
  },

  unsubscribe: async (id: string | number): Promise<void> => {
    const headers = getAuthHeaders();
    const res = await apiClient.delete<void>(`/v1/channel/u/${id}`, headers);
    return res;
  },
};

// src/services/channelService.ts
import { apiClient } from "./apiClient";
import { Channel } from "../models/channels/Channel";

export const channelService = {
  getSelf: () => apiClient.get<Channel>("/v1/channel"),
  getById: (id: string | number) => apiClient.get<Channel>(`/v1/channel/${id}`),
  getSubscribedChannels: () => apiClient.get<Channel[]>("/v1/channel/subscribed"),
  updateChannel: (body: Partial<Channel>) => apiClient.put<Channel>("/v1/channel", body),
  deleteChannel: () => apiClient.delete<void>("/v1/channel"),
  subscribe: (id: string | number) => apiClient.post<void>(`/v1/channel/s/${id}`),
  unsubscribe: (id: string | number) => apiClient.delete<void>(`/v1/channel/u/${id}`),
};

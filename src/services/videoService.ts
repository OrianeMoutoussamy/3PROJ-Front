import { apiClient } from "./apiClient";
import { Video } from "../models/videos/Video";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("authToken");
  return token ? { headers: { Token: token } } : {};
};

export const videoService = {
  getById: (id: number | string): Promise<Video> =>
    apiClient.get<Video>(`/v1/v/${id}`),

  getByChannel: (channelId: number | string): Promise<Video[]> =>
    apiClient.get<Video[]>(`/v1/v/channel/${channelId}`),

  uploadVideo: (data: Partial<Video>): Promise<Video> =>
    apiClient.post<Video>("/v1/v", data, getAuthHeaders()),

  updateVideo: (id: number | string, data: Partial<Video>): Promise<Video> =>
    apiClient.put<Video>(`/v1/v/${id}`, data, getAuthHeaders()),

  deleteVideo: (id: number | string): Promise<void> =>
    apiClient.delete<void>(`/v1/v/${id}`, getAuthHeaders()),

  reactVideo: (id: number | string, type: 1 | -1): Promise<void> =>
    apiClient.put<void>(`/v1/v/${id}/react`, { type }, getAuthHeaders()),

  commentVideo: (id: number | string, content: string): Promise<void> =>
    apiClient.put<void>(`/v1/v/${id}/comment`, { content }, getAuthHeaders()),

  deleteComment: (id: number | string, commentId: number | string): Promise<void> =>
    apiClient.delete<void>(`/v1/v/${id}/comment/${commentId}`, getAuthHeaders()),
};

import { apiClient } from "./apiClient";
import { Video } from "../models/videos/Video";

export const videoService = {
  getById: (id: number | string): Promise<Video> =>
    apiClient.get<Video>(`/v1/v/${id}`),

  uploadVideo: (data: Partial<Video>): Promise<Video> =>
    apiClient.post<Video>("/v1/v", data),

  updateVideo: (id: number | string, data: Partial<Video>): Promise<Video> =>
    apiClient.put<Video>(`/v1/v/${id}`, data),

  deleteVideo: (id: number | string): Promise<void> =>
    apiClient.delete<void>(`/v1/v/${id}`),

  reactVideo: (id: number | string, type: 1 | -1): Promise<void> =>
    apiClient.put<void>(`/v1/v/${id}/react`, { type }),

  commentVideo: (id: number | string, content: string): Promise<void> =>
    apiClient.put<void>(`/v1/v/${id}/comment`, { content }),

  deleteComment: (id: number | string, commentId: number | string): Promise<void> =>
    apiClient.delete<void>(`/v1/v/${id}/comment/${commentId}`),
};

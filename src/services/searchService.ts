import { apiClient } from "./apiClient";
import { Video } from "../models/videos/Video";

export const searchService = {
  searchVideos: (query: string): Promise<Video[]> =>
    apiClient.get<Video[]>(`/v1/search?query=${encodeURIComponent(query)}`),
};

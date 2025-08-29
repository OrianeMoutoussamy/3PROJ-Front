import { apiClient } from "./apiClient";

export const feedService = {
  getHomepageFeed: () => apiClient.get<void>("/v1/feed/home"),
  getTrendingFeed: () => apiClient.get<void>("/v1/feed/trending"),
};
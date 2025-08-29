import { apiClient } from "./apiClient";

export const feedService = {
  getHomepageFeed: () =>
    apiClient("/v1/feed/home", {
      method: "GET",
    }),

  getTrendingFeed: () =>
    apiClient("/v1/feed/trending", {
      method: "GET",
    }),
};

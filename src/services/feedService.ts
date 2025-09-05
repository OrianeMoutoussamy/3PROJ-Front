import { apiClient } from "./apiClient";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("authToken");
  return token ? { headers: { Token: token } } : {};
};

export const feedService = {
  getHomepageFeed: () => apiClient.get<void>("/v1/feed/home", getAuthHeaders()),
  getTrendingFeed: () => apiClient.get<void>("/v1/feed/trending", getAuthHeaders()),
};

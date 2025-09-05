import { apiClient } from "./apiClient";
import { Playlist } from "../models/playlists/Playlist";
import { PlaylistPayload } from "../models/playlists/payloads/NewPlaylistPayload";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("authToken");
  return token ? { headers: { Token: token } } : {};
};

export const playlistService = {
  getSelfPlaylists: async (): Promise<Playlist[]> => {
    const headers = getAuthHeaders();
    const res = await apiClient.get<Playlist[]>("/v1/playlist", headers);
    return res;
  },

  getPlaylistById: async (id: string | number): Promise<Playlist> => {
    const headers = getAuthHeaders();
    const res = await apiClient.get<Playlist>(`/v1/playlist/${id}`, headers);
    return res;
  },

  createPlaylist: async (payload: PlaylistPayload): Promise<Playlist> => {
    const headers = getAuthHeaders();
    const res = await apiClient.post<Playlist>("/v1/playlist", payload, headers);
    return res;
  },

  updatePlaylist: async (id: string | number, payload: Partial<Playlist>): Promise<Playlist> => {
    const headers = getAuthHeaders();
    const res = await apiClient.put<Playlist>(`/v1/playlist/${id}`, payload, headers);
    return res;
  },

  addVideoToPlaylist: async (id: string | number, videoId: string | number): Promise<void> => {
    const headers = getAuthHeaders();
    await apiClient.put<void>(`/v1/playlist/${id}/add/${videoId}`, null, headers);
  },

  removeVideoFromPlaylist: async (id: string | number, videoId: string | number): Promise<void> => {
    const headers = getAuthHeaders();
    await apiClient.put<void>(`/v1/playlist/${id}/del/${videoId}`, null, headers);
  },

  deletePlaylist: async (id: string | number): Promise<void> => {
    const headers = getAuthHeaders();
    await apiClient.delete<void>(`/v1/playlist/${id}`, headers);
  },
};

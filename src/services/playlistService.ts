import { apiClient } from "./apiClient";
import { Playlist } from "../models/playlists/Playlist";

export const playlistService = {
  getSelfPlaylists: (): Promise<Playlist[]> =>
    apiClient.get<Playlist[]>("/v1/playlist"),

  getPlaylistById: (id: string | number): Promise<Playlist> =>
    apiClient.get<Playlist>(`/v1/playlist/${id}`),

  createPlaylist: (body: Partial<Playlist>): Promise<Playlist> =>
    apiClient.post<Playlist>("/v1/playlist", body),

  updatePlaylist: (id: string | number, body: Partial<Playlist>): Promise<Playlist> =>
    apiClient.put<Playlist>(`/v1/playlist/${id}`, body),

  addVideoToPlaylist: (id: string | number, videoId: string | number): Promise<void> =>
    apiClient.put<void>(`/v1/playlist/${id}/add/${videoId}`),

  removeVideoFromPlaylist: (id: string | number, videoId: string | number): Promise<void> =>
    apiClient.put<void>(`/v1/playlist/${id}/del/${videoId}`),

  deletePlaylist: (id: string | number): Promise<void> =>
    apiClient.delete<void>(`/v1/playlist/${id}`),
};

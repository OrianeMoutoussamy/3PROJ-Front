import { apiClient } from "./apiClient";
// import { Playlist } from "../models/playlists/Playlist";

// export const playlistService = {
//   getSelfPlaylists: (): Promise<Playlist[]> =>
//     apiClient.get<Playlist[]>("/v1/playlist"),

//   getPlaylistById: (id: string | number): Promise<Playlist> =>
//     apiClient.get<Playlist>(`/v1/playlist/${id}`),

//   createPlaylist: (body: Partial<Playlist>): Promise<Playlist> =>
//     apiClient.post<Playlist>("/v1/playlist", body),

//   updatePlaylist: (id: string | number, body: Partial<Playlist>): Promise<Playlist> =>
//     apiClient.put<Playlist>(`/v1/playlist/${id}`, body),

//   addVideoToPlaylist: (id: string | number, videoId: string | number): Promise<void> =>
//     apiClient.put<void>(`/v1/playlist/${id}/add/${videoId}`),

//   removeVideoFromPlaylist: (id: string | number, videoId: string | number): Promise<void> =>
//     apiClient.put<void>(`/v1/playlist/${id}/del/${videoId}`),

//   deletePlaylist: (id: string | number): Promise<void> =>
//     apiClient.delete<void>(`/v1/playlist/${id}`),
// };


// MOCK

// services/playlistService.ts
export interface Channel {
  id: number;
  name: string;
  handle: string;
}

export interface Playlist {
  id: number;
  name: string;
  channel: Channel;
  createdAt?: string;
  updatedAt?: string;
}

const mockChannels: Channel[] = [
  { id: 1, name: "CodeBeats", handle: "@CodeBeats" },
  { id: 2, name: "LoFiBeats", handle: "@LoFiBeats" },
];

let mockPlaylists: Playlist[] = [
  {
    id: 1,
    name: "LoFi Chill",
    channel: mockChannels[1],
    createdAt: "2025-08-01",
  },
  {
    id: 2,
    name: "React Basics",
    channel: mockChannels[0],
    createdAt: "2025-07-20",
  },
  {
    id: 3,
    name: "Gaming Replays",
    channel: mockChannels[0],
    createdAt: "2025-07-15",
  },
];

export const playlistService = {
  getSelfPlaylists: async (): Promise<Playlist[]> => {
    return mockPlaylists.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  },

  getPlaylistById: async (id: number): Promise<Playlist | undefined> => {
    return mockPlaylists.find((p) => p.id === id);
  },

  createPlaylist: async (body: { name: string; channelId: number }): Promise<Playlist> => {
    const channel = mockChannels.find((c) => c.id === body.channelId);
    if (!channel) throw new Error("Channel not found");
    const newPlaylist: Playlist = {
      id: Math.floor(Math.random() * 10000),
      name: body.name,
      channel,
      createdAt: new Date().toISOString(),
    };
    mockPlaylists.push(newPlaylist);
    return newPlaylist;
  },

  updatePlaylist: async (id: number, body: { name?: string }): Promise<Playlist | undefined> => {
    const playlist = mockPlaylists.find((p) => p.id === id);
    if (playlist && body.name) {
      playlist.name = body.name;
      playlist.updatedAt = new Date().toISOString();
    }
    return playlist;
  },

  addVideoToPlaylist: async (playlistId: number, videoId: number): Promise<void> => {
    console.log(`Mock add video ${videoId} to playlist ${playlistId}`);
  },

  removeVideoFromPlaylist: async (playlistId: number, videoId: number): Promise<void> => {
    console.log(`Mock remove video ${videoId} from playlist ${playlistId}`);
  },

  deletePlaylist: async (id: number): Promise<void> => {
    mockPlaylists = mockPlaylists.filter((p) => p.id !== id);
  },
};

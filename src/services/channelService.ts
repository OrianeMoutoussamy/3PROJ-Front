// services/channelService.ts
import { Channel } from "../models/channels/Channel";
// import { apiClient } from "./apiClient";

// export const channelService = {
//   getSelf: () => apiClient.get<Channel>("/v1/channel"),
//   getById: (id: string | number) => apiClient.get<Channel>(`/v1/channel/${id}`),
//   getSubscribedChannels: () => apiClient.get<Channel[]>("/v1/channel/subscribed"),
//   updateChannel: (body: Partial<Channel>) => apiClient.put<Channel>("/v1/channel", body),
//   deleteChannel: () => apiClient.delete<void>("/v1/channel"),
//   subscribe: (id: string | number) => apiClient.post<void>(`/v1/channel/s/${id}`),
//   unsubscribe: (id: string | number) => apiClient.delete<void>(`/v1/channel/u/${id}`),
// };

// MOCK
const mockChannels: Channel[] = [
  {
    id: 1,
    user: { id: 1, email: "dev@example.com"},
    profilePicture: "/default-avatar.png",
    username: "CodeBeats",
    description: "Chaîne dédiée au dev et à la musique 🎵",
    createdAt: new Date("2024-06-01").toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    user: { id: 2, email: "js@example.com"},
    profilePicture: "/default-avatar.png",
    username: "Fireship",
    description: "Des vidéos rapides sur le développement web 🔥",
    createdAt: new Date("2024-07-10").toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const channelServiceMock = {
  getSelf: async () => mockChannels[0],
  getById: async (id: string | number) =>
    mockChannels.find((ch) => ch.id === Number(id)) || null,
  getByUsername: async (username: string) =>
    mockChannels.find((ch) => ch.username === username) || null, // <<< ici pour résoudre username -> id
  getSubscribedChannels: async () => mockChannels,
  updateChannel: async (body: Partial<Channel>) => ({
    ...mockChannels[0],
    ...body,
  }),
  deleteChannel: async () => {},
  subscribe: async (id: string | number) => {
    console.log(`Mock: Subscribed to channel ${id}`);
  },
  unsubscribe: async (id: string | number) => {
    console.log(`Mock: Unsubscribed from channel ${id}`);
  },
};

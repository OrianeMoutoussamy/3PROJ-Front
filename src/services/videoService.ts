import { apiClient } from "./apiClient";
import { Video } from "../models/videos/Video";

// export const videoService = {
//   getById: (id: number | string): Promise<Video> =>
//     apiClient.get<Video>(`/v1/v/${id}`),

//   uploadVideo: (data: Partial<Video>): Promise<Video> =>
//     apiClient.post<Video>("/v1/v", data),

//   updateVideo: (id: number | string, data: Partial<Video>): Promise<Video> =>
//     apiClient.put<Video>(`/v1/v/${id}`, data),

//   deleteVideo: (id: number | string): Promise<void> =>
//     apiClient.delete<void>(`/v1/v/${id}`),

//   reactVideo: (id: number | string, type: 1 | -1): Promise<void> =>
//     apiClient.put<void>(`/v1/v/${id}/react`, { type }),

//   commentVideo: (id: number | string, content: string): Promise<void> =>
//     apiClient.put<void>(`/v1/v/${id}/comment`, { content }),

//   deleteComment: (id: number | string, commentId: number | string): Promise<void> =>
//     apiClient.delete<void>(`/v1/v/${id}/comment/${commentId}`),
// };

// MOCK
import { Comment } from "../models/videos/Comment";
import { Reaction } from "../models/videos/Reaction";

let mockVideos: Video[] = [
  {
    id: 1,
    title: "Découverte de React",
    description: "Une introduction rapide à React.",
    duration: 420,
    isPublic: true,
    thumbnail: "https://via.placeholder.com/300x169?text=React",
    createdAt: "2025-07-01",
    updatedAt: "2025-07-05",
    channel: {
      id: 101,
      username: "CodeBeats",
      description: "Chaîne de dev et tutos",
      profilePicture: "https://via.placeholder.com/100x100?text=CB",
      createdAt: "2025-06-01",
      updatedAt: "2025-07-01",
      user: { id: 1001, email: "codebeats@example.com" },
    },
  },
  {
    id: 2,
    title: "Next.js avancé",
    description: "Deep dive sur le framework Next.js.",
    duration: 600,
    isPublic: true,
    thumbnail: "https://via.placeholder.com/300x169?text=Next",
    createdAt: "2025-07-15",
    updatedAt: "2025-07-18",
    channel: {
      id: 102,
      username: "DevEd",
      description: "Cours web modernes",
      profilePicture: "https://via.placeholder.com/100x100?text=DE",
      createdAt: "2025-05-20",
      updatedAt: "2025-07-10",
      user: { id: 1002, email: "deved@example.com" },
    },
  },
];

// stock séparé pour les commentaires et réactions
let mockComments: Comment[] = [
  {
    id: 1,
    content: "Super vidéo 👌",
    createdAt: "2025-08-01T12:00:00Z",
    video: mockVideos[0],
    channel: mockVideos[0].channel,
  },
];

let mockReactions: Reaction[] = [];

export const videoServiceMock = {
  getById: async (id: number | string): Promise<Video> => {
    const video = mockVideos.find((v) => v.id === Number(id));
    if (!video) throw new Error("Vidéo introuvable");
    return Promise.resolve(video);
  },

  uploadVideo: async (data: Partial<Video>): Promise<Video> => {
    const newVideo: Video = {
      id: mockVideos.length + 1,
      title: data.title || "Nouvelle vidéo",
      description: data.description || "",
      duration: data.duration || 0,
      isPublic: data.isPublic ?? true,
      thumbnail: data.thumbnail || "https://via.placeholder.com/300x169?text=New+Video",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      channel: data.channel || mockVideos[0].channel,
    };
    mockVideos.push(newVideo);
    return Promise.resolve(newVideo);
  },

  updateVideo: async (id: number | string, data: Partial<Video>): Promise<Video> => {
    const index = mockVideos.findIndex((v) => v.id === Number(id));
    if (index === -1) throw new Error("Vidéo introuvable");
    mockVideos[index] = { ...mockVideos[index], ...data, updatedAt: new Date().toISOString() };
    return Promise.resolve(mockVideos[index]);
  },

  deleteVideo: async (id: number | string): Promise<void> => {
    mockVideos = mockVideos.filter((v) => v.id !== Number(id));
    mockComments = mockComments.filter((c) => c.video.id !== Number(id));
    mockReactions = mockReactions.filter((r) => r.video.id !== Number(id));
    return Promise.resolve();
  },

  reactVideo: async (id: number | string, type: 1 | -1): Promise<void> => {
    mockReactions.push({
      id: mockReactions.length + 1,
      channel: mockVideos[0].channel,
      video: mockVideos.find((v) => v.id === Number(id))!,
      type,
      createdAt: new Date().toISOString(),
    });
    return Promise.resolve();
  },

  commentVideo: async (id: number | string, content: string): Promise<Comment> => {
    const video = mockVideos.find((v) => v.id === Number(id));
    if (!video) throw new Error("Vidéo introuvable");
    const newComment: Comment = {
      id: mockComments.length + 1,
      content,
      video,
      channel: video.channel,
      createdAt: new Date().toISOString(),
    };
    mockComments.unshift(newComment);
    return Promise.resolve(newComment);
  },

  deleteComment: async (id: number | string, commentId: number | string): Promise<void> => {
    mockComments = mockComments.filter((c) => !(c.video.id === Number(id) && c.id === Number(commentId)));
    return Promise.resolve();
  },

  getComments: async (id: number | string): Promise<Comment[]> => {
    return Promise.resolve(mockComments.filter((c) => c.video.id === Number(id)));
  },

  getReactions: async (id: number | string): Promise<{ likes: number; dislikes: number }> => {
    const likes = mockReactions.filter((r) => r.video.id === Number(id) && r.type === 1).length;
    const dislikes = mockReactions.filter((r) => r.video.id === Number(id) && r.type === -1).length;
    return Promise.resolve({ likes, dislikes });
  },
};
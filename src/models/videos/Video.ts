import { Channel } from "../channels/Channel";

export interface Video {
  id: number;
  channel: Channel;
  thumbnail?: string;
  title: string;
  description?: string;
  duration?: number;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
}
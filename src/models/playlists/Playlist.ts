import { Channel } from "../channels/Channel";

export interface Playlist {
  id: number;
  channel: Channel;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

import { Channel } from "../channels/Channel";
import { Video } from "./Video";

export interface Comment {
  id: number;
  channel: Channel;
  video: Video;
  content: string;
  createdAt?: string;
}
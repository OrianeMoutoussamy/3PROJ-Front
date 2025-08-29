import { Channel } from "../channels/Channel";
import { Video } from "./Video";

export interface Reaction {
  id: number;
  channel: Channel;
  video: Video;
  type: 1 | -1;
  createdAt?: string;
}
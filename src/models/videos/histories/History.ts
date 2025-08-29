import { HistoryId } from "./HistoryId";
import { Channel } from "../../channels/Channel";
import { Video } from "../Video";

export interface History {
  id: HistoryId;
  seenAt: string;
  channel: Channel;
  video: Video;
}

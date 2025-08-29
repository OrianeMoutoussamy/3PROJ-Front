import { VideoHashtagId } from "./VideoHashtagId";
import { Hashtag } from "./Hashtag";
import { Video } from "../Video";

export interface VideoHashtag {
  id: VideoHashtagId;
  hashtag: Hashtag;
  video: Video;
}

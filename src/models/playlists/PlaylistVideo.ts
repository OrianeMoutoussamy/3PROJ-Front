import { Playlist } from "./Playlist";
import { PlaylistVideoId } from "./PlaylistVideoId";
import { Video } from "../videos/Video";

export interface PlaylistVideo {
  id: PlaylistVideoId;
  addedAt?: string;
  playlist: Playlist;
  video: Video;
}
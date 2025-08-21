import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistVideoItem from "../components/videos/PlaylistVideoItem";
import "./Playlist.css";

interface Video {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  channelName: string;
  dateAdded: string;
}

const playlistsVideos: Record<string, Video[]> = {
  "lofi-chill": [
    {
      videoId: "1",
      thumbnailUrl: "https://picsum.photos/id/1011/120/68",
      title: "Chill beats pour travailler",
      channelName: "LoFiBeats",
      dateAdded: "2025-07-10",
    },
    {
      videoId: "2",
      thumbnailUrl: "https://picsum.photos/id/1012/120/68",
      title: "Evening Jazz Mix",
      channelName: "SmoothJazz",
      dateAdded: "2025-07-09",
    },
  ],
};

const Playlist: React.FC = () => {
  const { playlistName } = useParams<{ playlistName: string }>();
  const cleanName = playlistName ? playlistName.toLowerCase() : "";
  const displayName = playlistName ? playlistName.replace(/-/g, " ") : "";

  const [videos, setVideos] = useState<Video[]>(playlistsVideos[cleanName] || []);

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.videoId !== id));
  };

  return (
    <div className="playlist-container">
      <h1 className="playlist-title">{displayName}</h1>

      {videos.length === 0 ? (
        <p>Aucune vidéo dans cette playlist.</p>
      ) : (
        <div className="playlist-list">
          {videos.map((video) => (
            <PlaylistVideoItem
              key={video.videoId}
              {...video}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;

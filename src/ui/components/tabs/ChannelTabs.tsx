import React from "react";
import { Link } from "react-router-dom";
import VideoCardGrid from "../videos/VideoCardGrid";
import "./ChannelTabs.css";

interface Video {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  channelName: string;
  dateAdded: string;
  channelId: string;
  channelHandle: string;
}

interface Playlist {
  title: string;
  count: number;
}

interface Props {
  activeTab: "main" | "videos" | "playlists";
  videos: Video[];
  playlists: Playlist[];
}

const ChannelTabs: React.FC<Props> = ({ activeTab, videos, playlists }) => {
  if (activeTab === "main") {
    return (
      <div className="channel-main">
        <h2 className="section-title">Bienvenue sur la page principale 🎉</h2>
        <p>Ici, tu peux présenter ton channel.</p>
      </div>
    );
  }

  if (activeTab === "videos") {
    return (
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCardGrid key={video.videoId} {...video} />
        ))}
      </div>
    );
  }

  if (activeTab === "playlists") {
    return (
      <div className="playlist-list">
        {playlists.map((pl, index) => {
          const playlistLink = `/playlist/${encodeURIComponent(pl.title.replace(/\s+/g, "-").toLowerCase())}`;
          return (
            <div key={index} className="playlist-item">
              <Link to={playlistLink} className="playlist-name">
                {pl.title}
              </Link>
              <span className="playlist-count">{pl.count} vidéos</span>
              <button className="playlist-delete">Supprimer</button>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

export default ChannelTabs;

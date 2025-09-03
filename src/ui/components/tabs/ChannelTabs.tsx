import React from "react";
import "./ChannelTabs.css";
import VideoCardGrid from "../videos/VideoCardGrid";

interface ChannelTabsProps {
  activeTab: "main" | "videos" | "playlists";
  videos: any[];
  playlists?: any[];
}

const ChannelTabs: React.FC<ChannelTabsProps> = ({ activeTab, videos, playlists }) => {
  return (
    <div className="tab-content">
      {activeTab === "main" && (
        <div>
          <h3>À propos</h3>
          <p>Description fictive de la chaîne.</p>
        </div>
      )}

      {activeTab === "videos" && (
        <div className="videos-grid">
          {videos.map((video) => (
            <VideoCardGrid
              key={video.videoId}
              videoId={video.videoId}
              thumbnailUrl={video.thumbnailUrl}
              title={video.title}
              channelName={video.channelName}
              dateAdded={video.dateAdded}
              channelId={video.channelId}
              channelHandle={video.channelHandle}
            />
          ))}
        </div>
      )}

      {activeTab === "playlists" && playlists && (
        <ul>
          {playlists.map((pl, index) => (
            <li key={index}>
              {pl.title} ({pl.count} vidéos)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChannelTabs;

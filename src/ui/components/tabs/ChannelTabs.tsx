import React from "react";
import "./ChannelTabs.css";

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
            <div key={video.videoId} className="video-card">
              <img src={video.thumbnailUrl} alt={video.title} />
              <h4>{video.title}</h4>
              <p>{video.channelName}</p>
            </div>
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

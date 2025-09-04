import React from "react";
import "./ChannelTabs.css";
import VideoCardGrid from "../videos/VideoCardGrid";

interface ChannelTabsProps {
  activeTab: "main" | "videos";
  videos: any[];
}

const ChannelTabs: React.FC<ChannelTabsProps> = ({ activeTab, videos }) => {
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
            <VideoCardGrid key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelTabs;

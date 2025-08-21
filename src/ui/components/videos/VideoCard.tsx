// src/ui/components/videos/VideoCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';

interface VideoCardProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  channelName: string;
  dateAdded?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoId, thumbnailUrl, title, channelName, dateAdded }) => {
  return (
    <Link to={`/channel/${channelName}/video/${videoId}`} className="video-card">
      <img src={thumbnailUrl} alt={title} className="video-thumbnail" />
      <div className="video-info">
        <h3 className="video-title">{title}</h3>
        <p className="video-channel">{channelName}</p>
        {dateAdded && <p className="video-date">{new Date(dateAdded).toLocaleDateString()}</p>}
      </div>
    </Link>
  );
};

export default VideoCard;

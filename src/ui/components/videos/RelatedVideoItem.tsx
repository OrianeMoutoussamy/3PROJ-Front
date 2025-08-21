import React from 'react';
import { Link } from 'react-router-dom';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
}

const RelatedVideoItem: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <Link to={`/channel/${video.channel}/video/${video.id}`} className="related-video-item">
      <img src={video.thumbnail} alt={video.title} className="related-thumbnail" />
      <div className="related-info">
        <p className="related-title">{video.title}</p>
        <p className="related-channel">{video.channel}</p>
      </div>
    </Link>
  );
};

export default RelatedVideoItem;

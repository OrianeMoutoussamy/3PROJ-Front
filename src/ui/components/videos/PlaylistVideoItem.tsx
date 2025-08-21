import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import "./PlaylistVideoItem.css";

interface PlaylistVideoItemProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  channelName: string;
  dateAdded: string;
  onDelete?: (id: string) => void;
}

const PlaylistVideoItem: React.FC<PlaylistVideoItemProps> = ({
  videoId,
  thumbnailUrl,
  title,
  channelName,
  dateAdded,
  onDelete,
}) => {
  return (
    <div className="video-item">
      <Link to={`/channel/${channelName}/video/${videoId}`} className="video-info">
        <img src={thumbnailUrl} alt={title} className="video-thumbnail" />
        <span className="video-title">{title}</span>
        <span className="video-channel">{channelName}</span>
        <span className="video-date">{dateAdded}</span>
      </Link>
      <button
        className="video-delete"
        onClick={() => onDelete && onDelete(videoId)}
      >
        <Trash2 size={16} />
        Retirer
      </button>
    </div>
  );
};

export default PlaylistVideoItem;

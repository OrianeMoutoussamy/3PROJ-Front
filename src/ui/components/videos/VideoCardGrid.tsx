import React from "react";
import { Link } from "react-router-dom";
import "./VideoCardGrid.css";

interface VideoCardGridProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  channelName: string;
  dateAdded: string;
  channelId: string; // pour l'URL vidéo
  channelHandle: string; // pour l'URL du channel
}

const VideoCardGrid: React.FC<VideoCardGridProps> = ({
  videoId,
  thumbnailUrl,
  title,
  channelName,
  dateAdded,
  channelId,
  channelHandle,
}) => {
  return (
    <div className="video-card-grid w-full">
      {/* Thumbnail */}
      <Link to={`/channel/${channelId}/video/${videoId}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="thumbnail rounded-lg w-full cursor-pointer"
        />
      </Link>

      {/* Infos */}
      <div className="video-info flex mt-2">
        <img
          src="/default-avatar.png"
          alt={channelName}
          className="channel-avatar w-10 h-10 rounded-full mr-3"
        />
        <div className="video-texts">
          {/* Titre de la vidéo */}
          <Link
            to={`/channel/${channelId}/video/${videoId}`}
            className="video-title font-semibold text-sm cursor-pointer"
          >
            {title}
          </Link>
          {/* Nom du channel */}
          <p className="video-meta text-gray-500 text-xs">
            <Link
              to={`/channel/${channelHandle}`}
              className="hover:underline cursor-pointer"
            >
              {channelName}
            </Link>{" "}
            • {dateAdded}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCardGrid;

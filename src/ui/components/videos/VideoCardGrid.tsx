import React from "react";
import { Link } from "react-router-dom";
import "./VideoCardGrid.css";

interface VideoCardGridProps {
  video: any; // juste l'objet renvoyé par le service
}

const VideoCardGrid: React.FC<VideoCardGridProps> = ({ video }) => {
  const channel = video.channel;

  return (
    <div className="video-card-grid w-full">
      <Link to={`/channel/${channel.username}/video/${video.id}`}>
        <img
          src={video.thumbnail || "/default-thumbnail.png"}
          alt={video.title}
          className="thumbnail rounded-lg w-full cursor-pointer"
        />
      </Link>

      <div className="video-info flex mt-2">
        <img
          src={channel.profilePicture || "/default-avatar.png"}
          alt={channel.username}
          className="channel-avatar w-10 h-10 rounded-full mr-3"
        />
        <div className="video-texts">
          <Link
            to={`/channel/${channel.username}/video/${video.id}`}
            className="video-title font-semibold text-sm cursor-pointer"
          >
            {video.title}
          </Link>

          <p className="video-meta text-gray-500 text-xs">
            <Link
              to={`/channel/${channel.username}`}
              className="hover:underline cursor-pointer"
            >
              {channel.username}
            </Link>{" "}
            • {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : "Date inconnue"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCardGrid;

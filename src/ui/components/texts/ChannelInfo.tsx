import React from "react";
import { Link } from "react-router-dom";
import "./ChannelInfo.css";

interface ChannelInfoProps {
  channelName: string;
  channelHandle?: string; // ex: "@DevEd"
  avatarUrl?: string;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  channelName,
  channelHandle,
  avatarUrl = "/default-avatar.png",
}) => {
  return (
    <div className="channel-info">
      <img
        src={avatarUrl}
        alt={channelName}
        className="channel-avatar"
      />
      <div className="channel-details">
        {channelHandle ? (
          <Link to={`/channel/${channelHandle}`} className="channel-link">
            {channelName}
          </Link>
        ) : (
          <span>{channelName}</span>
        )}
      </div>
    </div>
  );
};

export default ChannelInfo;

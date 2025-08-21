import React from 'react';

interface Props {
  channelName: string;
}

const ChannelInfo: React.FC<Props> = ({ channelName }) => {
  return (
    <div className="channel-info">
      <div className="channel-avatar"></div>
      <span className="channel-name">{channelName}</span>
      <button className="subscribe-btn">S'abonner</button>
    </div>
  );
};

export default ChannelInfo;

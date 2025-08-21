import React from 'react';

interface Props {
  title: string;
  description: string;
  date: string;
}

const VideoDescription: React.FC<Props> = ({ title, description, date }) => {
  return (
    <div className="video-description">
      <h2>{title}</h2>
      <p className="video-date">Publié le {date}</p>
      <p className="video-text">{description}</p>
    </div>
  );
};

export default VideoDescription;

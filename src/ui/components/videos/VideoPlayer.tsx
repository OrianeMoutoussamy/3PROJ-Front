import React from 'react';

interface Props {
  videoId: string;
}

const VideoPlayer: React.FC<Props> = ({ videoId }) => {
  return (
    <div className="video-player">
      <video controls width="100%">
        <source src={`https://example.com/videos/${videoId}.mp4`} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    </div>
  );
};

export default VideoPlayer;

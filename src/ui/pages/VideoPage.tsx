import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/videos/VideoPlayer';
import ChannelInfo from '../components/texts/ChannelInfo';
import VideoDescription from '../components/videos/VideoDescription';
import RelatedVideos from '../components/videos/RelatedVideos';
import './VideoPage.css';

const VideoPage: React.FC = () => {
  const { channelName, videoId } = useParams<{ channelName: string; videoId: string }>();

  return (
    <div className="video-page">
      <div className="video-main">
        <VideoPlayer videoId={videoId!} />
        <ChannelInfo channelName={channelName!} />
        <VideoDescription
          title="Titre de la vidéo"
          description="Ceci est une description détaillée de la vidéo, avec des infos et peut-être des hashtags."
          date="2025-08-12"
        />
      </div>
      <aside className="video-related">
        <RelatedVideos />
      </aside>
    </div>
  );
};

export default VideoPage;

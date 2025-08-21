import React from 'react';
import RelatedVideoItem from './RelatedVideoItem';

const relatedVideos = [
  { id: 'abc123', title: 'Autre vidéo 1', thumbnail: 'https://picsum.photos/id/1011/200/120', channel: 'DevEd' },
  { id: 'def456', title: 'Autre vidéo 2', thumbnail: 'https://picsum.photos/id/1012/200/120', channel: 'Fireship' },
];

const RelatedVideos: React.FC = () => {
  return (
    <div>
      {relatedVideos.map((video) => (
        <RelatedVideoItem key={video.id} video={video} />
      ))}
    </div>
  );
};

export default RelatedVideos;

// src/components/tabs/ChannelTabs.tsx
import React from 'react';
import VideoCard from '../videos/VideoCard';

interface Video {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  channelName: string;
  dateAdded: string;
}

interface Playlist {
  title: string;
  count: number;
}

interface Props {
  activeTab: 'main' | 'videos' | 'playlists';
  videos: Video[];
  playlists: Playlist[];
}

const ChannelTabs: React.FC<Props> = ({ activeTab, videos, playlists }) => {
  if (activeTab === 'main') {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Bienvenue sur la page principale 🎉</h2>
        <p className="text-gray-600">Ici, tu peux présenter ton channel.</p>
      </div>
    );
  }

  if (activeTab === 'videos') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {videos.map((video) => (
          <VideoCard key={video.videoId} {...video} />
        ))}
      </div>
    );
  }

  if (activeTab === 'playlists') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {playlists.map((pl, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-3">
            <div className="h-32 bg-gray-200 mb-3 rounded"></div>
            <h3 className="font-semibold">{pl.title}</h3>
            <p className="text-sm text-gray-500">{pl.count} vidéos</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ChannelTabs;

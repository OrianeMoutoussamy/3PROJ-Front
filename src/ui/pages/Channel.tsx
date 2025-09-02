import React, { useState } from 'react';
import ChannelTabs from '../components/tabs/ChannelTabs';
import { useParams } from 'react-router-dom';
import './Channel.css';

const Channel: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [activeTab, setActiveTab] = useState<'main' | 'videos' | 'playlists'>('main');

  // Données fictives enrichies (compatibles avec VideoCard)
  const videos = [
    { 
      videoId: '1',
      thumbnailUrl: 'https://via.placeholder.com/300x169?text=Video+1',
      title: 'Ma première vidéo',
      channelName: handle?.startsWith('@') ? handle.slice(1) : handle || 'Inconnu',
      dateAdded: '2025-07-01',
      channelId: "CodeBeats",
      channelHandle: "@CodeBeats",
    },
    { 
      videoId: '2',
      thumbnailUrl: 'https://via.placeholder.com/300x169?text=Video+2',
      title: 'React pour les nuls',
      channelName: handle?.startsWith('@') ? handle.slice(1) : handle || 'Inconnu',
      dateAdded: '2025-06-28',
      channelId: "CodeBeats",
    channelHandle: "@CodeBeats",
    },
    { 
      videoId: '3',
      thumbnailUrl: 'https://via.placeholder.com/300x169?text=Video+3',
      title: 'Best of 2025',
      channelName: handle?.startsWith('@') ? handle.slice(1) : handle || 'Inconnu',
      dateAdded: '2025-06-15',
      channelId: "CodeBeats",       
    channelHandle: "@CodeBeats",
    },
    { 
      videoId: '4',
      thumbnailUrl: 'https://via.placeholder.com/300x169?text=Video+4',
      title: 'Présentation du channel',
      channelName: handle?.startsWith('@') ? handle.slice(1) : handle || 'Inconnu',
      dateAdded: '2025-06-01',
      channelId: "CodeBeats",       
    channelHandle: "@CodeBeats",
    },
  ];

  return (
    <div className="channel-container">
      <header className="channel-header">
        <div className="profile-circle" />
        <h1 className="channel-title">{handle?.startsWith('@') ? handle.slice(1) : handle}</h1>
        <button className="subscribe-button">S’abonner</button>
      </header>

      <div className="channel-tabs">
        {['main', 'videos', 'playlists'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={activeTab === tab ? 'active' : ''}
            type="button"
          >
            {tab === 'main' ? 'Main' : tab === 'videos' ? 'Vidéos' : 'Playlists'}
          </button>
        ))}
      </div>
      <ChannelTabs activeTab={activeTab} videos={videos}/>
    </div>
  );
};

export default Channel;

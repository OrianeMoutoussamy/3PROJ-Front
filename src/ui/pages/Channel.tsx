import React, { useState } from 'react';
import ChannelTabs from '../components/tabs/ChannelTabs';
import { useParams } from 'react-router-dom';
import './Channel.css';

const Channel: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [activeTab, setActiveTab] = useState<'main' | 'videos' | 'playlists'>('main');

  const videos = [
    { title: 'Ma première vidéo', date: '2025-07-01' },
    { title: 'React pour les nuls', date: '2025-06-28' },
    { title: 'Best of 2025', date: '2025-06-15' },
    { title: 'Présentation du channel', date: '2025-06-01' },
  ];

  const playlists = [
    { title: 'Série React', count: 8 },
    { title: 'Gaming 2025', count: 5 },
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

      <ChannelTabs activeTab={activeTab} videos={videos} playlists={playlists} />
    </div>
  );
};

export default Channel;

import React from 'react';
import { useParams } from 'react-router-dom';
import VideoListItem from '../components/videos/VideoListItem'; // ajuste le chemin
import './Playlist.css'; // ou un fichier css global

interface Video {
  thumbnailUrl: string;
  title: string;
  channelName: string;
  dateAdded: string;
}

const playlistsVideos: Record<string, Video[]> = {
  'lofi-chill': [
    {
      thumbnailUrl: 'https://picsum.photos/id/1011/320/180',
      title: 'Chill beats pour travailler',
      channelName: 'LoFi Beats',
      dateAdded: '2025-07-10',
    },
    {
      thumbnailUrl: 'https://picsum.photos/id/1012/320/180',
      title: 'Evening Jazz Mix',
      channelName: 'Smooth Jazz',
      dateAdded: '2025-07-09',
    },
  ],
  // autres playlists...
};

const Playlist: React.FC = () => {
  const { playlistName } = useParams<{ playlistName: string }>();
  const cleanName = playlistName ? playlistName.toLowerCase() : '';
  const displayName = playlistName ? playlistName.replace(/-/g, ' ') : '';

  const videos = playlistsVideos[cleanName] || [];

  return (
    <div style={{ padding: '24px', margin: '0 auto' }}>
      <h1 style={{ fontWeight: '600', fontSize: '1.8rem', color: '#374151' }}>{displayName}</h1>
      <hr style={{ borderColor: '#d1d5db', margin: '12px 0 24px 0' }} />

      {videos.length === 0 && <p>Aucune vidéo dans cette playlist.</p>}

      <div>
        {videos.map((video, index) => (
          <VideoListItem
            key={index}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            channelName={video.channelName}
            dateAdded={video.dateAdded}
            onDelete={() => alert(`Suppression de "${video.title}" non implémentée`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;

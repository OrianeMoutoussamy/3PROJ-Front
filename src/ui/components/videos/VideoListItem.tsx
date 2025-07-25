import React from 'react';

interface VideoListItemProps {
  thumbnailUrl: string;
  title: string;
  channelName: string;
  dateAdded: string;
  onDelete?: () => void; // bouton supprimer (non fonctionnel pour l'instant)
}

const VideoListItem: React.FC<VideoListItemProps> = ({
  thumbnailUrl,
  title,
  channelName,
  dateAdded,
  onDelete,
}) => (
  <div className="video-list-item">
    <img src={thumbnailUrl} alt={title} className="video-thumbnail" />
    <div className="video-info">
      <h4 className="video-title">{title}</h4>
      <p className="video-channel">{channelName}</p>
      <p className="video-date">Ajouté le {dateAdded}</p>
    </div>
    <button
      className="delete-button"
      onClick={onDelete}
      aria-label={`Supprimer "${title}" de la playlist`}
      type="button"
    >
      🗑️
    </button>
  </div>
);

export default VideoListItem;

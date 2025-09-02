import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { playlistService } from "../../services/playlistService";
import "./Playlist.css";

const Playlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any | null>(null);

  useEffect(() => {
  if (id) {
    playlistService.getPlaylistById(Number(id)).then((data) => {
      setPlaylist(data);
    });
  }
}, [id]);


  if (!playlist) {
    return <p>Chargement de la playlist...</p>;
  }

  return (
    <div className="playlist-page">
      <h2>{playlist.name}</h2>
      <p>Créée le : {new Date(playlist.createdAt!).toLocaleDateString()}</p>
      <ul className="video-list">
        {playlist.videos?.map((video: any) => (
          <li key={video.id} className="video-item">
            <span>{video.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;

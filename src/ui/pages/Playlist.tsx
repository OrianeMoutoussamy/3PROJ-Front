import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { playlistService } from "../../services/playlistService";
import "./Playlist.css";

const Playlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylist = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const data = await playlistService.getPlaylistById(Number(id));
        setPlaylist(data);
      } catch (err) {
        console.error("Erreur lors du chargement de la playlist", err);
        setError("Impossible de charger la playlist");
      } finally {
        setLoading(false);
      }
    };

    loadPlaylist();
  }, [id]);

  if (loading) {
    return <p>Chargement de la playlist...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!playlist) {
    return <p>Aucune playlist trouvée</p>;
  }

  return (
    <div className="playlist-page">
      <h2>{playlist.name}</h2>
      {playlist.createdAt && (
        <p>Créée le : {new Date(playlist.createdAt).toLocaleDateString()}</p>
      )}
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

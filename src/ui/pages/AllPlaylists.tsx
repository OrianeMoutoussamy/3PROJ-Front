import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { playlistService } from "../../services/playlistService";
import "./AllPlaylists.css";

const AllPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    const data = await playlistService.getSelfPlaylists();
    setPlaylists(data);
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await playlistService.createPlaylist({ name: newName.trim(), channelId: 1 });
    setNewName("");
    loadPlaylists();
  };

  const handleDelete = async (id: number) => {
    await playlistService.deletePlaylist(id);
    loadPlaylists();
  };

  return (
    <div className="all-playlists-container">
      <h1 className="all-playlists-title">Mes Playlists</h1>
      <hr className="all-playlists-separator" />

      <div className="playlist-add">
        <input
          type="text"
          placeholder="Nouvelle playlist..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleCreate} className="playlist-add-btn">
          ➕ Créer
        </button>
      </div>

      <ul className="all-playlists-list">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="playlist-line">
            <Link
              to={`/playlist/${playlist.id}`}
              className="playlist-name"
            >
              {playlist.name}
            </Link>
            <button
              className="playlist-delete-btn"
              onClick={() => handleDelete(playlist.id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPlaylists;

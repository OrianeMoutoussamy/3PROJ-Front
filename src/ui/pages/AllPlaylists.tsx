import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { playlistService } from "../../services/playlistService";
import { channelService } from "../../services/channelService";
import { Plus, X } from "lucide-react";
import "./AllPlaylists.css";

const AllPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [selfChannelId, setSelfChannelId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Récupérer le channel de l'utilisateur
        const selfChannel = await channelService.getSelf();
        setSelfChannelId(selfChannel.id);

        // Récupérer playlists
        const data = await playlistService.getSelfPlaylists();
        setPlaylists(data);
      } catch (err) {
        setToast({ message: "Impossible de charger les playlists", type: "error" });
      }
    };
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim() || !selfChannelId) return;

    try {
      await playlistService.createPlaylist({
        name: newName.trim(),
        channel: { id: selfChannelId },
        videos: []
      });

      setNewName("");
      setToast({ message: "Playlist créée avec succès", type: "success" });

      // Recharger playlists
      const data = await playlistService.getSelfPlaylists();
      setPlaylists(data);
    } catch (err) {
      setToast({ message: "Erreur lors de la création", type: "error" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await playlistService.deletePlaylist(id);
      setToast({ message: "Playlist supprimée", type: "success" });

      // Recharger playlists
      setPlaylists(playlists.filter(p => p.id !== id));
    } catch (err) {
      setToast({ message: "Erreur lors de la suppression", type: "error" });
    }
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
          <Plus size={16} /> Créer
        </button>
      </div>

      <ul className="all-playlists-list">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="playlist-line">
            <Link to={`/playlist/${playlist.id}`} className="playlist-name">
              {playlist.name}
            </Link>
            <button
              className="playlist-delete-btn"
              onClick={() => handleDelete(playlist.id)}
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
          <button onClick={() => setToast(null)}><X size={14} /></button>
        </div>
      )}
    </div>
  );
};

export default AllPlaylists;

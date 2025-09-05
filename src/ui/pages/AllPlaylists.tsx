import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { playlistService } from "../../services/playlistService";
import { channelService } from "../../services/channelService";
import { Plus, X, Edit2, Check } from "lucide-react";
import "./AllPlaylists.css";

const AllPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [selfChannelId, setSelfChannelId] = useState<number | null>(null);
  const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const selfChannel = await channelService.getSelf();
        setSelfChannelId(selfChannel.id);

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
      setPlaylists(playlists.filter(p => p.id !== id));
    } catch (err) {
      setToast({ message: "Erreur lors de la suppression", type: "error" });
    }
  };

  const handleEdit = (playlist: any) => {
    setEditingPlaylist(playlist.id);
    setEditingName(playlist.name);
  };

  const handleUpdate = async (id: number) => {
    if (!editingName.trim()) return;

    try {
      const updated = await playlistService.updatePlaylist(id, { name: editingName.trim() });
      setPlaylists(playlists.map(p => (p.id === id ? updated : p)));
      setEditingPlaylist(null);
      setEditingName("");
      setToast({ message: "Playlist mise à jour", type: "success" });
    } catch (err) {
      setToast({ message: "Erreur lors de la mise à jour", type: "error" });
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
            {editingPlaylist === playlist.id ? (
              <>
                <input
                  type="text"
                  className="playlist-edit-input"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <div className="playlist-actions">
                  <button
                    onClick={() => handleUpdate(playlist.id)}
                    className="playlist-edit-confirm-btn"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setEditingPlaylist(null)}
                    className="playlist-edit-cancel-btn"
                  >
                    <X size={16} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to={`/playlist/${playlist.id}`} className="playlist-name">
                  {playlist.name}
                </Link>
                <div className="playlist-actions">
                  <button onClick={() => handleEdit(playlist)}>
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(playlist.id)}>
                    <X size={16} />
                  </button>
                </div>
              </>
            )}
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { playlistService } from "../../services/playlistService";
import { channelService } from "../../services/channelService";
import { Plus } from "lucide-react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [subscribedChannels, setSubscribedChannels] = useState<any[]>([]);
  const [selfChannelId, setSelfChannelId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const selfChannel = await channelService.getSelf();
        setSelfChannelId(selfChannel.id);

        const [playlistsData, subscriptions] = await Promise.all([
          playlistService.getSelfPlaylists(),
          channelService.getSubscribedChannels()
        ]);

        // Trier et prendre les 5 dernières playlists
        const sorted = [...playlistsData].sort(
          (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        setPlaylists(sorted.slice(0, 5));

        setSubscribedChannels(subscriptions);
      } catch (err) {
        console.error("Erreur lors du chargement des données", err);
      }
    };

    loadData();
  }, []);

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim() || !selfChannelId) return;

    try {
      await playlistService.createPlaylist({
        name: newPlaylistName.trim(),
        channel: { id: selfChannelId },
        videos: []
      });

      setNewPlaylistName("");
      setShowModal(false);

      // Recharger les playlists après création
      const data = await playlistService.getSelfPlaylists();
      const sorted = [...data].sort(
        (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      setPlaylists(sorted.slice(0, 5));
    } catch (err) {
      console.error("Erreur lors de la création de la playlist", err);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section sidebar-playlists">
        <h3>Playlists</h3>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id} className="playlist-item-wrapper">
              <Link to={`/playlist/${playlist.id}`} className="playlist-item">
                {playlist.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="sidebar-playlist-actions" style={{ display: "flex", gap: "8px" }}>
          <Link to="/playlists" className="btn-see-all-playlists">
            Voir plus…
          </Link>
          <button className="btn-add-playlist" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Ajouter
          </button>
        </div>
      </div>

      <div className="sidebar-section sidebar-subscriptions">
        <h3>Abonnements</h3>
        {subscribedChannels.map((channel) => (
          <Link key={channel.id} to={`/channel/${channel.username}`} className="subscription-item">
            <div className="subscription-avatar">
              {channel.profilePicture ? (
                <img
                  src={channel.profilePicture}
                  alt={channel.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-400" />
              )}
            </div>
            <span className="subscription-name">{channel.username}</span>
            {channel.subscribed && <span className="subscribed-badge">✓</span>}
          </Link>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Créer une nouvelle playlist</h2>
            <input
              type="text"
              placeholder="Nom de la playlist"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleCreatePlaylist} className="submit-btn">
                Créer
              </button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

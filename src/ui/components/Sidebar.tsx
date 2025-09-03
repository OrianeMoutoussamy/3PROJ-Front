import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { playlistService } from "../../services/playlistService";
import { channelServiceMock as channelService } from "../../services/channelService";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [subscribedChannels, setSubscribedChannels] = useState<any[]>([]);

  useEffect(() => {
    playlistService.getSelfPlaylists().then((data) => {
      const sorted = [...data].sort(
        (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      setPlaylists(sorted.slice(0, 5));
    });

    channelService.getSubscribedChannels().then((channels) => {
      setSubscribedChannels(channels);
    });
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-section sidebar-playlists">
        <h3>Playlists</h3>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <Link to={`/playlist/${playlist.id}`} className="playlist-item">
                {playlist.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="sidebar-playlist-actions">
          <Link to="/playlists" className="btn-see-all-playlists">
            Voir toutes les playlists
          </Link>
          <button className="btn-add-playlist">+</button>
        </div>
      </div>

      <div className="sidebar-section sidebar-subscriptions">
        <h3>Abonnements</h3>
        {subscribedChannels.map((channel) => (
          <Link
            key={channel.id}
            to={`/channel/@${channel.username}`}
            className="subscription-item"
          >
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
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

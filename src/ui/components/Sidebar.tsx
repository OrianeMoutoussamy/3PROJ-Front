import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const playlists = ['LoFi Chill', 'React Basics', 'Gaming Replays'];
    const subscribedChannels = ['DevEd', 'Fireship', 'Traversy Media'];

    return (
        <aside className="sidebar">
            <div className="sidebar-section sidebar-playlists">
                <h3>Playlists</h3>
                <ul>
                    {playlists.map((playlist, index) => (
                        <li key={index}>
                            <Link
                                to={`/playlist/${encodeURIComponent(playlist.replace(/\s+/g, '-').toLowerCase())}`}
                                className="playlist-item"
                            >
                                {playlist}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link to="/playlists" className="btn-see-all-playlists">
                    Voir toutes les playlists
                </Link>
            </div>

            <div className="sidebar-section sidebar-subscriptions">
                <h3>Abonnements</h3>
                {subscribedChannels.map((channel, index) => (
                    <Link
                        key={index}
                        to={`/channel/@${channel.replace(/\s+/g, '')}`}
                        className="subscription-item"
                    >
                        <div className="subscription-avatar"></div>
                        <span className="subscription-name">{channel}</span>
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;

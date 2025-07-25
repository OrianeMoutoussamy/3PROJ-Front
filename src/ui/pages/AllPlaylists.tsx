import React from 'react';
import { Link } from 'react-router-dom';
import './AllPlaylists.css';

const playlists = ['LoFi Chill', 'React Basics', 'Gaming Replays', 'Coding Tutorials', 'Music Mixes'];

const AllPlaylists: React.FC = () => {
  return (
    <div className="all-playlists-container">
      <h1 className="all-playlists-title">Toutes les playlists</h1>
      <hr className="all-playlists-separator" />
      <ul className="all-playlists-list">
        {playlists.map((playlist, index) => (
          <li key={index} className="playlist-line">
            <Link
              to={`/playlist/${encodeURIComponent(playlist.replace(/\s+/g, '-').toLowerCase())}`}
              className="playlist-name"
            >
              {playlist}
            </Link>
            <button className="playlist-delete-btn" onClick={() => {}}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPlaylists;

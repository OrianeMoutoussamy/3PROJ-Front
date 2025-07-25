import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../ui/pages/Homepage';
import Channel from '../ui/pages/Channel';
import Playlist from '../ui/pages/Playlist';
import AllPlaylists from '../ui/pages/AllPlaylists';
import Login from '../ui/pages/Login';
import Register from '../ui/pages/Register';

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/channel/:handle" element={<Channel />} />
        <Route path="/playlist/:playlistName" element={<Playlist />} />
        <Route path="/playlists" element={<AllPlaylists />} />
        </Routes>
    );
};

export default RoutesComponent;
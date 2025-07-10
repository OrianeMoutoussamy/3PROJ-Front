import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../ui/pages/Homepage';
import Login from '../ui/pages/Login';
import Register from '../ui/pages/Register';

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default RoutesComponent;
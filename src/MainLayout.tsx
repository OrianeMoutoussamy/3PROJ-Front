import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './ui/components/navbar'; 
import RoutesComponent from './routes/routes'; 

const MainLayout: React.FC = () => {
    const location = useLocation();

    const shouldDisplayNavbar = location.pathname !== '/login' && location.pathname !== '/register';

    return (
        <>
        {shouldDisplayNavbar && <Navbar />}  {/* Affiche la Navbar sauf sur login et register */}
        <RoutesComponent />  {/* Rend les routes de ton application */}
        </>
    );
};

export default MainLayout;

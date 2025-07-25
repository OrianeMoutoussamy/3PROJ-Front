import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './ui/components/Navbar';
import Sidebar from './ui/components/Sidebar';
import RoutesComponent from './routes/routes';
import hiddenRoutes from './hiddenRoutes';

const MainLayout: React.FC = () => {
    const location = useLocation();
    const shouldDisplayLayout = !hiddenRoutes.includes(location.pathname);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {shouldDisplayLayout && <Navbar />}

        <div style={{ display: 'flex', flex: 1 }}>
            {shouldDisplayLayout && <Sidebar />}
            <div style={{ flex: 1, overflowY: 'auto' }}>
            <RoutesComponent />
            </div>
        </div>
        </div>
    );
};

export default MainLayout;

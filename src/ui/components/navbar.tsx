import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
        <ul style={{ listStyleType: 'none', display: 'flex' }}>
            <li>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Homepage</Link>
            </li>
        </ul>
        </nav>
    );
};

export default Navbar;

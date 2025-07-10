import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import './navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <img src="/freetube.png" alt="FreeTube Logo" className="logo" />
                </Link>
            </div>

            <div className="navbar-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-bar"
                />
            </div>

            <div className="navbar-right">
                <Link to="/login" className="nav-button">
                    <LogIn size={18} className="icon" />
                    Login
                </Link>
                <Link to="/register" className="nav-button">
                    <UserPlus size={18} className="icon" />
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

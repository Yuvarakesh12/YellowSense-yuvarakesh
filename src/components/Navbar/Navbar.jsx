import React from 'react';
import './Navbar.css'; // Ensure you import the CSS file
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const getClassName = (path) => {
        return location.pathname === path ? 'navbar-item active' : 'navbar-item';
    };

    return (
        <div className="navbar">
            <Link to="/" className={getClassName('/')}>
                <div className="navbar-item">Jobs</div>
            </Link>
            <Link to="/bookmarks" className={getClassName('/bookmarks')}>
                <div className="navbar-item">Bookmarks</div>
            </Link>
        </div>
    );
};

export default Navbar;


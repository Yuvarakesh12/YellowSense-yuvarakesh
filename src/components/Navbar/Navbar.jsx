import React from 'react';
import './Navbar.css'; // Ensure you import the CSS file
import { Link, useLocation } from 'react-router-dom';
import { FaBriefcase, FaBookmark } from 'react-icons/fa'; // Importing icons

const Navbar = () => {
    const location = useLocation();
    const getClassName = (path) => {
        return location.pathname === path ? 'navbar-item active' : 'navbar-item';
    };

    return (
        <div className="navbar">
            <Link to="/" className={getClassName('/')}>
                <div className="navbar-item">
                    {/* Display icon or text based on screen size */}
                    <span className="navbar-text">Jobs</span>
                    <FaBriefcase className="navbar-icon" />
                </div>
            </Link>
            <Link to="/bookmarks" className={getClassName('/bookmarks')}>
                <div className="navbar-item">
                    <span className="navbar-text">Bookmarks</span>
                    <FaBookmark className="navbar-icon" />
                </div>
            </Link>
        </div>
    );
};

export default Navbar;



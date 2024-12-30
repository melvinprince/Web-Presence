import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './css/Header.css';

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div className="header">
            <div className="logo">
                <Link to="/">Web Presence</Link>
            </div>
            <div className="links">
                {isAuthenticated ? (
                    <Link to="/logout" onClick={handleLogout}>Logout</Link>
                ) : (
                    <Link to="/authpage">SignUp/SignIn</Link>
                )}
                <Link to="/support">Support</Link>
            </div>
        </div>
    )
}

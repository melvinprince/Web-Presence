import React from "react";
import {Link} from 'react-router-dom';
import './css/Header.css';

export default function Header() {
    return (
        <div className="header">
            <div className="logo">
                <Link to="/">Web Presence</Link>
            </div>
            <div className="links">
                <Link to="/authpage">SignUp/SignIn</Link>
                <Link to="/support">Support</Link>
            </div>
        </div>
    )
}
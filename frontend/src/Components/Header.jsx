import React from "react";
import {Link} from 'react-router-dom';
import './css/Header.css';

export default function Header(loggedIn) {
    return (
        <div className="header">
            <div className="logo">
                <Link to="/">Web Presence</Link>
            </div>
            <div className="links">
                {loggedIn ? <Link to="/logout">logout</Link> :<Link to="/authpage">SignUp/SignIn</Link>}
                <Link to="/support">Support</Link>
            </div>
        </div>
    )
}
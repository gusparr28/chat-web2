import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav>
            <div className="container">
                <div className="nav-wrapper">
                    <Link to={"/"} className="brand-logo">Web Chat App</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to={"/signin"}>Sign In</Link></li>
                        <li><Link to={"/signup"}>Sign Up</Link></li>
                        <li><Link to={"#"} onClick={props.logout}>Log Out</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
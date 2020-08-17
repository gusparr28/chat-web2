import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = (props) => {

    const auth = useSelector(state => state.auth);

    return (
        <nav>
            <div className="container">
                <div className="nav-wrapper">
                    <Link to={"/"} className="brand-logo">Web Chat App</Link>
                    {
                        !auth.authenticated ?
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to={"/signin"}>Sign In</Link></li>
                                <li><Link to={"/signup"}>Sign Up</Link></li>
                            </ul> : null
                    }
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {
                            auth.authenticated ?
                                <li><Link to={"#"} onClick={props.logout}>Log Out</Link></li> : null
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';

const Navbar = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    /*
    const logout = () => {
        dispatch(logoutUser);
    };
    */

    return (
        <nav className="#1976d2 blue darken-2">
            <div className="container #1976d2">
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
                                <li><Link to={"/"} onClick={() => {
                                    dispatch(logoutUser(auth.uid))
                                }}>Log Out</Link></li> : null
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
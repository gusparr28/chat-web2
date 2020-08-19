import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { signin, isSignedInUser } from '../actions/authActions';

import Layout from './Layout';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    /*
        useEffect(() => {
            if (!auth.authenticated) {
                dispatch(isSignedInUser());
            }
        }, []);
    */
    const signInUser = (e) => {
        e.preventDefault();
        if (email == "") {
            alert("Email is required");
            return;
        }
        if (password == "") {
            alert("Password is required");
            return;
        }
        dispatch(signin({ email, password }));
    };

    if (auth.authenticated) {
        return <Redirect to={'/'} />
    }

    return (
        <Layout>
            <div className="signin-container">
                <Card>
                    <form onSubmit={signInUser}>
                        <h3 className="title-signin">Sign In</h3>
                        <div className="row">
                            <div className="input-field col s12">
                                <i class="material-icons prefix">mail</i>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i class="material-icons prefix">lock</i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <center>
                            <div className="row">
                                <button id="btn-signin" className="col s16 btn btn-small green black-text waves-effect z-depth-1 y-depth-1">Sign In</button>
                            </div>
                        </center>
                    </form>
                </Card>
            </div>
        </Layout>
    )
};

export default SignIn;
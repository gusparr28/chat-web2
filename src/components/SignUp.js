import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signup } from '../actions/authActions';

import Layout from './Layout';
import Card from './Card';

const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const signUpUser = (e) => {
        e.preventDefault()
        const user = {
            firstName, lastName, email, password
        };
        dispatch(signup(user));
    };

    if (auth.authenticated) {
        return <Redirect to={'/signin'} />
    }

    return (
        <Layout>
            <div className="signup-container">
                <Card>
                    <form onSubmit={signUpUser}>
                        <h3 className="title-signup">Sign Up</h3>
                        <div className="row">
                            <div className="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
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
                                <button id="btn-signup" className="col s16 btn btn-small green black-text waves-effect z-depth-1 y-depth-1">Sign Up</button>
                            </div>
                        </center>
                    </form>
                </Card>
            </div>
        </Layout>
    )
};

export default SignUp;

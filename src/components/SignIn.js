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
                        <h3>Sign In</h3>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div>
                            <button>Sign In</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    )
};

export default SignIn;
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
                        <h3>Sign Up</h3>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
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
                            <button>Sign Up</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    )
};

export default SignUp;

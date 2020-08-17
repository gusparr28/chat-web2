import React, { useState } from 'react';

import Layout from './Layout';
import Card from './Card';

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Layout>
            <div className="signin-container">
                <Card>
                    <form>
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
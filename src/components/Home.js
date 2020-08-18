import React, { useEffect } from 'react';

import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../actions/userActions';

const Home = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getRealtimeUsers(auth.uid));
    }, []);

    console.log(user);

    return (
        <Layout>
            <section className="container-home">
                <div className="listOfUsers">
                    {
                        user.users.length > 0 ?
                            user.users.map(user => {
                                return (
                                    <div key={user.uid} className="displayName">
                                        <div className="displayPic">
                                            <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
                                        </div>
                                        <div className="container-user-name">
                                            <span className="user-name">{user.firstName} {user.lastName}</span>
                                            <span>{user.isOnline ? 'online' : 'offline'}</span>
                                        </div>
                                    </div>
                                );
                            }) : null
                    }

                </div>
                <div className="chatArea">
                    <div className="chatHeader"> Rizwan Khan </div>
                    <div className="messageSections">
                        <div className="messages">
                            <p className="messageStyle" >Hello User</p>
                        </div>
                    </div>
                    <div className="chatControls">
                        <textarea />
                        <button>Send</button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Home;
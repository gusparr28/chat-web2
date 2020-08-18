import React, { useEffect, useState } from 'react';

import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../actions/userActions';

const User = (props) => {

    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user)} className="displayName">
            <div className="displayPic">
                <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
            </div>
            <div className="container-user-name">
                <span className="user-name">{user.firstName} {user.lastName}</span>
                <span>{user.isOnline ? 'online' : 'offline'}</span>
            </div>
        </div>
    );
}

const Home = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [startedChat, setStartedChat] = useState(false);
    const [userChat, setUserChat] = useState("");
    let unsubscribe;

    useEffect(() => {
        unsubscribe = dispatch(getRealtimeUsers(auth.uid))
            .then(unsubscribe => {
                return unsubscribe;
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    console.log(user);

    useEffect(() => {
        return () => {
            unsubscribe.then(f => f()).catch(error => console.log(error));
        }
    }, []);

    const initChat = (user) => {
        setStartedChat(true);
        setUserChat(`${user.firstName} ${user.lastName}`)
        console.log(user);
    };

    return (
        <Layout>
            <section className="container-home">
                <div className="listOfUsers">
                    {
                        user.users.length > 0 ?
                            user.users.map(user => {
                                return (
                                    <User onClick={initChat} key={user.uid} user={user} />
                                );
                            }) : null
                    }
                </div>
                <div className="chatArea">
                    <div className="chatHeader">
                        {
                            startedChat ? userChat : ''
                        }
                    </div>
                    <div className="messageSections">
                        {
                            startedChat ?
                                <div className="messages">
                                    <p className="messageStyle" >Hello User</p>
                                </div> : null
                        }
                    </div>
                    {
                        startedChat ?
                            <div className="chatControls">
                                <textarea />
                                <button>Send</button>
                            </div> : null
                    }
                </div>
            </section>
        </Layout>
    );
}

export default Home;
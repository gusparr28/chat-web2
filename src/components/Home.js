import React, { useEffect, useState } from 'react';

import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage, getRealtimeChats } from '../actions/userActions';

const User = (props) => {

    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user)} className="displayName">
            <div className="displayPic">
                <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
            </div>
            <div className="container-user-name">
                <span className="user-name">{user.firstName} {user.lastName}</span>
                <span className={user.isOnline ? `online-status` : `offline-status`}></span>
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
    const [message, setMessage] = useState("");
    const [userUid, setUserUid] = useState(null);
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

    useEffect(() => {
        return () => {
            unsubscribe.then(f => f()).catch(error => console.log(error));
        }
    }, []);

    const initChat = (user) => {
        setStartedChat(true);
        setUserChat(`${user.firstName} ${user.lastName}`)
        setUserUid(user.uid);
        console.log(user);
        dispatch(getRealtimeChats({ uid_1: auth.uid, uid_2: user.uid }))
    };

    const sendMessage = (e) => {
        const msg = {
            user_uid_1: auth.uid,
            user_uid_2: userUid,
            message
        }
        if (message !== "") {
            dispatch(updateMessage(msg))
            .then(() => {
                setMessage("");
            });
        }
        console.log(msg);
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
                                user.chats.map(chat => {
                                    return (
                                        <div className={chat.user_uid_1 == auth.uid ? `sent` : `received`}>
                                            <p className="messageStyle" >{chat.message}</p>
                                        </div>
                                    );
                                }) : null
                        }
                    </div>
                    {
                        startedChat ?
                            <div className="chatControls">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Start messaging"
                                />
                                <button onClick={sendMessage}>Send</button>
                            </div> : null
                    }
                </div>
            </section>
        </Layout>
    );
}

export default Home;
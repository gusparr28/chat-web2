import React, { useEffect, useState } from 'react';
import { storage } from '../index';

import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage, getRealtimeChats } from '../actions/userActions';

const User = (props) => {

    const { user, onClick } = props;

    return (
        <div onClick={() => onClick(user)} className="displayName">
            <div className="displayPic">
                <img src="https://res.cloudinary.com/instagram-web2/image/upload/v1596229249/unnamed_q4rlmp.png" />
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
    const [image, setImage] = useState(null);
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
        dispatch(getRealtimeChats({ uid_1: auth.uid, uid_2: user.uid }))
    };

    const sendMessage = () => {
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
    };

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        const msg = {
                            user_uid_1: auth.uid,
                            user_uid_2: userUid,
                            message: url
                        }
                        dispatch(updateMessage(msg));
                    });
            }
        );
    };

    const validateInputType = chat => {
        if (chat.message.startsWith("https://firebasestorage.googleapis.com/v0/b/chat-web2-aa36e.appspot.com/o/images%2F")) {
            return <img className="sent-image" src={chat.message}></img>
        } else {
            return <p className="messageStyle" >{chat.message}</p>
        }
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
                                        <div key={Math.random()} className={chat.user_uid_1 == auth.uid ? `sent` : `received`}>
                                            {
                                                validateInputType(chat)
                                            }
                                        </div>
                                    );
                                }) : null
                        }
                    </div>
                    {
                        startedChat ?
                            <div className="chatControls">
                                <input type="file" onChange={handleChange} />
                                <button onClick={handleUpload}>Upload</button>
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

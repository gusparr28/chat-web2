import React from 'react';

import Layout from './Layout';

const Home = (props) => {
    return (
        <Layout>
            <section className="container-home">
                <div className="listOfUsers">
                    <div className="displayName">
                        <div className="displayPic">
                            <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
                        </div>
                        <div className="container-user-name">
                            <span className="user-name">Rizwan Khan</span>
                            <span>online</span>
                        </div>
                    </div>
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
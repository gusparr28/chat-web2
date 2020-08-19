import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store/createStore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8kQjJrn9tJrXc4ktImOsN2oQw-xDz4v8",
  authDomain: "chat-web2-aa36e.firebaseapp.com",
  databaseURL: "https://chat-web2-aa36e.firebaseio.com",
  projectId: "chat-web2-aa36e",
  storageBucket: "chat-web2-aa36e.appspot.com",
  messagingSenderId: "736749546925",
  appId: "1:736749546925:web:bde3daaa8a0197ce1f4524"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

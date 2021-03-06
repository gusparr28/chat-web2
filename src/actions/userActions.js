import { userConstants } from "./constants";
import { firestore } from 'firebase';

export const getRealtimeUsers = (uid) => {
    return async (dispatch) => {
        dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });
        const db = firestore();
        const unsubscribe = db.collection("users")
            //.where("uid", "!=", uid)
            .onSnapshot((querySnapshot) => {
                const users = [];
                querySnapshot.forEach(function (doc) {
                    if (doc.data().uid != uid) {
                        users.push(doc.data());
                    }
                });
                dispatch({
                    type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                    payload: { users }
                });
            });
        return unsubscribe;
    };
};

export const updateMessage = (msg) => {
    return async dispatch => {
        const db = firestore();
        db.collection("chats")
            .add({
                ...msg,
                viewed: false,
                createdAt: new Date()
            })
            .then((data) => {
                /*
                dispatch({
                    type: userConstants.GET_REALTIME_MESSAGES
                });
                */
            })
            .catch(error => {
                console.error(error);
            });
    };
};

export const getRealtimeChats = (user) => {
    return async dispatch => {
        const db = firestore();
        db.collection("chats")
            .where("user_uid_1", "in", [user.uid_1, user.uid_2])
            .orderBy("createdAt", "asc")
            .onSnapshot((querySnapshot) => {
                const chats = [];
                querySnapshot.forEach(doc => {
                    if (
                        (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
                        ||
                        (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
                    ) {
                        chats.push(doc.data());
                    }
                });
                if (chats.length > 0) {
                    dispatch({
                        type: userConstants.GET_REALTIME_MESSAGES,
                        payload: { chats }
                    });
                } else {
                    dispatch({
                        type: `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
                        payload: { chats }
                    });
                };
            });
    };
};

export const searchUsersFeature = (firstName) => {
    return {
        type: "SEARCH_USER",
        payload: firstName
    }
};


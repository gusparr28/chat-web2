import { auth, firestore } from 'firebase';
import { authConstant } from './constants';

export const signup = (user) => {
    return async (dispatch) => {
        const db = firestore();
        dispatch({ type: `${authConstant.USER_SIGNIN}_REQUEST` })
        auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                const currentUser = auth().currentUser;
                const name = `${user.firstName} ${user.lastName}`;
                currentUser.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        db.collection("users")
                            .doc(data.user.uid)
                            .set({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                uid: data.user.uid,
                                createdAt: new Date(),
                                isOnline: true
                            })
                            .then(() => {
                                const signedUpUser = {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    uid: data.user.uid,
                                    email: user.email
                                }
                                localStorage.setItem('user', JSON.stringify(signedUpUser));
                                console.log("User signed in successfully")
                                dispatch({
                                    type: `${authConstant.USER_SIGNIN}_SUCCESS`,
                                    payload: { user: signedUpUser }
                                })
                            })
                            .catch(error => {
                                console.error(error);
                                dispatch({
                                    type: `${authConstant.USER_SIGNIN}_FAILURE`,
                                    payload: { error }
                                })
                            });
                    });
            })
            .catch(error => {
                console.error(error);
            });
    };
};

export const signin = (user) => {
    return async dispatch => {
        dispatch({ type: `${authConstant.USER_SIGNIN}_REQUEST` });
        auth().signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                const db = firestore();
                db.collection("users")
                    .doc(data.user.uid)
                    .update({
                        isOnline: true
                    })
                    .then(() => {
                        const signedInUser = {
                            firstName,
                            lastName,
                            uid: data.user.uid,
                            email: data.user.email
                        }
                        localStorage.setItem('user', JSON.stringify(signedInUser));
                        dispatch({
                            type: `${authConstant.USER_SIGNIN}_SUCCESS`,
                            payload: { user: signedInUser }
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
                const name = data.user.displayName.split(" ");
                const firstName = name[0];
                const lastName = name[1];
            })
            .catch(error => {
                console.error(error);
                dispatch({
                    type: `${authConstant.USER_SIGNIN}_FAILURE`,
                    payload: { error }
                });
            });
    };
};

export const isSignedInUser = () => {
    return async dispatch => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (user) {
            dispatch({
                type: `${authConstant.USER_SIGNIN}_SUCCESS`,
                payload: { user }
            })
        } else {
            dispatch({
                type: `${authConstant.USER_SIGNIN}_FAILURE`,
                payload: { error: 'Sign In again please' }
            });
        };
    };
};

export const logoutUser = (uid) => {
    return async dispatch => {
        dispatch({ type: `${authConstant.USER_LOGOUT}_REQUEST` });
        const db = firestore();
        db.collection("users")
            .doc(uid)
            .update({
                isOnline: false
            })
            .then(() => {
                auth().signOut()
                    .then(() => {
                        localStorage.clear();
                        dispatch({ type: `${authConstant.USER_LOGOUT}_SUCCESS` });
                    })
                    .catch(error => {
                        console.error(error);
                        dispatch({ type: `${authConstant.USER_LOGOUT}_FAILURE`, payload: { error } });
                    });
            })
            .catch(error => {
                console.error(error);
            });
    };
};
import { auth, firestore } from 'firebase';
import { authConstant } from './constants';

export const signup = (user) => {
    return async (dispatch) => {
        const db = firestore();
        dispatch({ type: `${authConstant.USER_SIGNIN}_REQUEST` })
        auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                console.log(data);
                const currentUser = auth().currentUser;
                const name = `${user.firstName} ${user.lastName}`;
                currentUser.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        db.collection("users").add({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            uid: data.user.uid,
                            createdAt: new Date()
                        })
                            .then(() => {
                                const signedInUser = {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    uid: data.user.uid,
                                    email: user.email
                                }
                                localStorage.setItem('user', JSON.stringify(signedInUser));
                                console.log("User signed in successfully")
                                dispatch({
                                    type: `${authConstant.USER_SIGNIN}_SUCCESS`,
                                    payload: { user: signedInUser }
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

import { userConstants } from "../actions/constants"

const initState = {
    users: [],
    chats: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
            break;
        case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
            state = {
                ...state,
                users: action.payload.users
            }
            break;
        case userConstants.GET_REALTIME_MESSAGES:
            state = {
                ...state, 
                chats: action.payload.chats
            }
            break;
    }
    return state;

}
import {
    GET_ORDER_BY_CUSOMER_ERROR,
    GET_ORDER_BY_CUSOMER_REQUEST,
    GET_ORDER_BY_CUSOMER_SUCCESS,
    LOGIN_FACEBOOK_ERROR,
    LOGIN_FACEBOOK_REQUEST,
    LOGIN_FACEBOOK_SUCCESS,
    LOGIN_GOOGLE_ERROR,
    LOGIN_GOOGLE_REQUEST,
    LOGIN_GOOGLE_SUCCESS,
    REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    SIGNIN_ERROR,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    UPDATE_AVATAR_ERROR,
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_INFO_CUSTOMMER_ERROR,
    UPDATE_INFO_CUSTOMMER_REQUEST,
    UPDATE_INFO_CUSTOMMER_SUCCESS,
    USER_LOGOUT,
} from "../Constants/AuthConstant";

const initialState = {
    loading: false,
    user: {},
    token: null,
    error: null,
    message: null,
    authenticate: false,
    authenticating: false,
    listOrder: [],
    messageSignin: null,
    messageGG: null,
    errorGG: null,
    messageFB: null,
    erorFB: null
};

const updateUser = (user, newUser) => {
    user.email = newUser.email;
    user.address = newUser.address;
    return user;
}

const updateAvatar = (user, newAvatar) => {
    user.avatar = newAvatar.avatar;
    return user;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case REGISTER_REQUEST:
            state = {
                loading: true,
                authenticating: true
            };
            break;
        case REGISTER_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                token: action.payload.token,
                user: action.payload.user,
                authenticate: true,
                authenticating: false,
            };
            break;
        case REGISTER_ERROR:
            state = {
                ...state,
                error: action.payload,
                authenticating: false,
            };
            break;
        // REGISTER
        case SIGNIN_REQUEST:
            state = {
                loading: true,
                authenticating: true
            };
            break;
        case SIGNIN_SUCCESS:
            console.log("SIGNIN_SUCCESS", action.payload.message);
            state = {
                ...state,
                messageSignin: action.payload.message,
                token: action.payload.token,
                user: action.payload.user,
                authenticate: true,
                authenticating: false,
            };
            break;
        case SIGNIN_ERROR:
            state = {
                ...state,
                error: action.payload,
                authenticating: false,
            };
            break;
        // SIGNIN
        case USER_LOGOUT:
            state = { ...initialState };
            break;
        // LOGOUT
        case UPDATE_INFO_CUSTOMMER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case UPDATE_INFO_CUSTOMMER_SUCCESS:
            let newUser = updateUser(state.user, action.payload.user);
            state = {
                ...state,
                loading: false,
                user: newUser,
                message: action.payload.message
            }
            break;
        case UPDATE_INFO_CUSTOMMER_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break;
        // UPDATE_INFO_CUSTOMER
        case UPDATE_AVATAR_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case UPDATE_AVATAR_SUCCESS:
            let newAvatar = updateAvatar(state.user, action.payload);

            state = {
                ...state,
                loading: false,
                user: newAvatar,
                // message: action.payload.message
            }
            break;
        case UPDATE_AVATAR_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break;
        // UPDATE_AVATAR
        case GET_ORDER_BY_CUSOMER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_ORDER_BY_CUSOMER_SUCCESS:
            state = {
                ...state,
                loading: false,
                listOrder: action.payload,
            }
            break;
        case GET_ORDER_BY_CUSOMER_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            }
            break;
        // GET_ORDER_BY_CUSTOMER
        case LOGIN_GOOGLE_REQUEST:
            state = {
                loading: true,
                authenticating: true
            };
            break;
        case LOGIN_GOOGLE_SUCCESS:
            state = {
                ...state,
                messageGG: action.payload.message,
                token: action.payload.token,
                user: action.payload.user,
                authenticate: true,
                authenticating: false,
            };
            break;
        case LOGIN_GOOGLE_ERROR:
            state = {
                ...state,
                errorGG: action.payload,
                authenticating: false,
            };
            break;
        // SIGNIN_GOOGLE
        case LOGIN_FACEBOOK_REQUEST:
            state = {
                loading: true,
                authenticating: true
            };
            break;
        case LOGIN_FACEBOOK_SUCCESS:
            state = {
                ...state,
                messageFB: action.payload.message,
                token: action.payload.token,
                user: action.payload.user,
                authenticate: true,
                authenticating: false,
            };
            break;
        case LOGIN_FACEBOOK_ERROR:
            state = {
                ...state,
                erorFB: action.payload,
                authenticating: false,
            };
            break;
        // SIGNIN_FACEBOOK
    }
    return state;
};

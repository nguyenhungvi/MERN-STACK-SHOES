import {
  ADMIN_GET_ACCOUNT_ERROR,
  ADMIN_GET_ACCOUNT_NEW_ERROR,
  ADMIN_GET_ACCOUNT_NEW_REQUEST,
  ADMIN_GET_ACCOUNT_NEW_SUCCESS,
  ADMIN_GET_ACCOUNT_REQUEST,
  ADMIN_GET_ACCOUNT_SUCCESS,
  ADMIN_GET_CART_ERROR,
  ADMIN_GET_CART_REQUEST,
  ADMIN_GET_CART_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_SIGNIN_ERROR,
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  UPDATE_ACCOUNT_ADMIN_REQUEST,
  UPDATE_ACCOUNT_ADMIN_SUCCESS,
  UPDATE_ACCOUNT_ADMIN_ERROR,
  ADMIN_REGESTER_ACCOUNT_REQUEST,
  ADMIN_REGESTER_ACCOUNT_SUCCESS,
  ADMIN_REGESTER_ACCOUNT_ERROR,
} from "../Constants/authConstant";

const initialState = {
  token: null,
  user: {},
  authenticate: false,
  authenticating: false,
  error: null,
  loading: false,
  message: null,
  success: false,
  listAccount: [],
  accountNew: [],
  listCart: [],
  errorRegister: null,
  messageRegister: null
};

const updateAccount = (user, newUser) => {
  const data = Object.is(user.email, newUser.email);
  if (data) {
    user.name = newUser.name;
    user.phone = newUser.phone;
    user.address = newUser.address;
  }
  return user;
}

const addAccount = (users, newAccount) => {
  users.push(newAccount);
  return users;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_SIGNIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case ADMIN_SIGNIN_SUCCESS:
      state = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticate: true,
        authenticating: false,
        loading: true,
        success: true
      };
      break;
    case ADMIN_SIGNIN_ERROR:
      state = {
        ...state,
        error: action.payload,
        authenticating: false,
        loading: false
      };
      break;
    case ADMIN_LOGOUT:
      state = {
        ...initialState,
      };
      break;
    // ADMIN_LOGOUT
    case ADMIN_GET_ACCOUNT_REQUEST:
      state = {
        ...state,
        loading: true
      };
      break;
    case ADMIN_GET_ACCOUNT_SUCCESS:
      state = {
        ...state,
        loading: false,
        listAccount: action.payload
      };
      break;
    case ADMIN_GET_ACCOUNT_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload
      };
      break;
    // ADMIN GET ACCOUNT
    case ADMIN_GET_ACCOUNT_NEW_REQUEST:
      state = {
        ...state,
        loading: true
      };
      break;
    case ADMIN_GET_ACCOUNT_NEW_SUCCESS:
      state = {
        ...state,
        loading: false,
        accountNew: action.payload
      };
      break;
    case ADMIN_GET_ACCOUNT_NEW_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload
      };
      break;
    // ADMIN GET ACCOUNT NEW
    case ADMIN_GET_CART_REQUEST:
      state = {
        ...state,
        loading: true
      };
      break;
    case ADMIN_GET_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        listCart: action.payload
      };
      break;
    case ADMIN_GET_CART_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload
      };
      break;
    // ADMIN GET ACCOUNT NEW

    case UPDATE_ACCOUNT_ADMIN_REQUEST:
      state = {
        ...state,
        loading: true
      };
      break;
    case UPDATE_ACCOUNT_ADMIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: updateAccount(state.user, action.payload.user)
      };
      break;
    case UPDATE_ACCOUNT_ADMIN_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload
      };
      break;
    // UPDATE ACCOUNT
    case ADMIN_REGESTER_ACCOUNT_REQUEST:
      state = {
        ...state,
        loading: true
      };
      break;
    case ADMIN_REGESTER_ACCOUNT_SUCCESS:
      state = {
        ...state,
        loading: false,
        messageRegister: action.payload.message,
        accountNew: addAccount(state.accountNew,action.payload.user)
      };
      break;
    case ADMIN_REGESTER_ACCOUNT_ERROR:
      state = {
        ...state,
        loading: false,
        errorRegister: action.payload
      };
      break;
    // UPDATE ACCOUNT
  }
  return state;
};

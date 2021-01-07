import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers";
import thunk from "redux-thunk";

var data = JSON.parse(localStorage.getItem("cart"));
var cartItems = data ? data : [];
const initialState = { cart: { items: cartItems } };

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;

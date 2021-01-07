//https://github.com/vothecong/shopping-cart-vtc-success/blob/master/src/Actions/cartActions.js
import {
    ADD_CART_BY_SIGNIN,
    ADD_TO_CART,
    CLEAR_CART,
    DELETE_PRODUCT_IN_CART,
    MINUS_QTY_PRODUCT_IN_CART,
    PLUS_QTY_PRODUCT_IN_CART,
} from "../Constants/CartConstant";
const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case ADD_TO_CART:
            state = { ...state, items: action.payload };
            break;
        case CLEAR_CART:
            state = { ...state, items: action.payload };
            break;
        case ADD_CART_BY_SIGNIN:
            state = { ...state, items: action.payload };
            break;
        case PLUS_QTY_PRODUCT_IN_CART:
            state = {
                ...state,
                items: action.payload
            };
            break;
        case MINUS_QTY_PRODUCT_IN_CART:
            state = {
                ...state,
                items: action.payload
            };
            break;
        case DELETE_PRODUCT_IN_CART:
            state = {
                ...state,
                items: action.payload
            };
            break;

    }
    return state;
};

import {
    POST_ORDER_ERROR,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
} from "../Constants/OrderConstant";

const initialState = {
    loading: false,
    message: null,
    error: null,
    postOrder: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case POST_ORDER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case POST_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                postOrder: action.payload.order
            };
            break;
        case POST_ORDER_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
    }
    return state;
};

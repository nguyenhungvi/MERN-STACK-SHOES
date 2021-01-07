import {
    GET_CATEGORY_ERROR,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
} from "../Constants/CategoryConstant";

const initialState = {
    loading: false,
    listCategory: [],
    error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_CATEGORY_SUCCESS:
            state = {
                ...state,
                listCategory: action.payload,
                loading: false,
            };
            break;
        case GET_CATEGORY_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
    }
    return state;
};

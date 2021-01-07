import {
    GET_REVIEW_ERROR,
    GET_REVIEW_REQUEST,
    GET_REVIEW_SUCCESS,
    GET_ALL_REVIEW_ERROR,
    GET_ALL_REVIEW_REQUEST,
    GET_ALL_REVIEW_SUCCESS,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_ERROR,
} from "../Constants/reviewConstant";

const initialState = {
    loading: false,
    reviews: [],
    error: null,
    listReview: []
};

function updateReview(listReview, data) {
    return listReview.filter((x) => x._id !== data._id);
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEW_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_REVIEW_SUCCESS:
            state = {
                ...state,
                loading: false,
                reviews: action.payload,
            };
            break;
        case GET_REVIEW_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        case GET_ALL_REVIEW_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_ALL_REVIEW_SUCCESS:
            state = {
                ...state,
                loading: false,
                listReview: action.payload,
            };
            break;
        case GET_ALL_REVIEW_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // GET ALL REVIEW
        case DELETE_REVIEW_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case DELETE_REVIEW_SUCCESS:
            state = {
                ...state,
                loading: false,
                listReview: updateReview(state.listReview, action.payload),
            };
            break;
        case DELETE_REVIEW_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // DELETE ALL REVIEW
    }
    return state;
};

import { GET_REVIEW_ERROR, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS, POST_REVIEW_ERROR, POST_REVIEW_REQUEST, POST_REVIEW_SUCCESS } from "../Constants/ReviewConstant";

const initialState = {
    loading: false,
    reviews: [],
    error: null
};

function addReview(products, newProduct) {
    products.push(newProduct);
    return products;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case POST_REVIEW_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;

        case POST_REVIEW_SUCCESS:
            state = {
                ...state,
                loading: false,
                reviews: addReview(state.reviews, action.payload)
            }
            break;

        case POST_REVIEW_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break;

        case GET_REVIEW_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case GET_REVIEW_SUCCESS:
            state = {
                ...state,
                loading: false,
                reviews: action.payload
            }
            break;
        case GET_REVIEW_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break;
    }
    return state;
};
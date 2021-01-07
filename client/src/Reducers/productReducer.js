import {
    GET_ALL_PRODUCT_ERROR,
    GET_ALL_PRODUCT_REQUEST,
    GET_ALL_PRODUCT_SUCCESS,
    GET_DETAIL_PRODUCT_ERROR,
    GET_DETAIL_PRODUCT_REQUEST,
    GET_DETAIL_PRODUCT_SUCCESS,
    GET_PRODUCT_BY_CATEGORY_ERROR,
    GET_PRODUCT_BY_CATEGORY_REQUEST,
    GET_PRODUCT_BY_CATEGORY_SUCCESS,
    GET_PRODUCT_BY_PRICE_ERROR,
    GET_PRODUCT_BY_PRICE_REQUEST,
    GET_PRODUCT_BY_PRICE_SUCCESS,
    GET_PRODUCT_BY_SIZE_ERROR,
    GET_PRODUCT_BY_SIZE_REQUEST,
    GET_PRODUCT_BY_SIZE_SUCCESS,
    GET_PRODUCT_BY_SORT_ERROR,
    GET_PRODUCT_BY_SORT_REQUEST,
    GET_PRODUCT_BY_SORT_SUCCESS,
    GET_PRODUCT_HOME_ERROR,
    GET_PRODUCT_HOME_REQUEST,
    GET_PRODUCT_HOME_SUCCESS,
    GET_RELATE_PRODUCT_ERROR,
    GET_RELATE_PRODUCT_REQUEST,
    GET_RELATE_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_ERROR,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    UPDATE_REVIEW_PRODUCT_SUCCESS,
} from "../Constants/ProductConstant";

const initialState = {
    loading: false,
    error: null,
    productByCategory: [],
    productOne: {},
    loadingRelate: false,
    relateProduct: [],
    errorRelate: null,
    listProduct: [],
    loadingReview: false,
    loadingDetail: false,
    errorDetail: null,
    loadingAll: false,
    errorAll: false,
    loadingHome: false,
    errorHome: false,
    productsHome: []
};

function updateProductReview(listProduct, data) {
    const index = listProduct.findIndex((x) => x._id === data._id);
    listProduct[index].totalReview = data.totalReview;
    listProduct[index].totalStar = data.totalStar;
    return listProduct;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case GET_PRODUCT_BY_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_PRODUCT_BY_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                productByCategory: action.payload,
            };
            break;
        case GET_PRODUCT_BY_CATEGORY_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // GET_PRODUCT_BY_CATEGORY
        case GET_PRODUCT_BY_SORT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_PRODUCT_BY_SORT_SUCCESS:
            state = {
                ...state,
                loading: false,
                productByCategory: action.payload,
            };
            break;
        case GET_PRODUCT_BY_SORT_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // GET_PRODUCT_BY_SORT
        case GET_PRODUCT_BY_PRICE_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_PRODUCT_BY_PRICE_SUCCESS:
            state = {
                ...state,
                loading: false,
                productByCategory: action.payload,
            };
            break;
        case GET_PRODUCT_BY_PRICE_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // GET_PRODUCT_BY_SORT
        case GET_PRODUCT_BY_SIZE_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_PRODUCT_BY_SIZE_SUCCESS:
            state = {
                ...state,
                loading: false,
                productByCategory: action.payload,
            };
            break;
        case GET_PRODUCT_BY_SIZE_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // GET_PRODUCT_BY_SIZE
        case GET_DETAIL_PRODUCT_REQUEST:
            state = {
                ...state,
                loadingDetail: true,
            };
            break;
        case GET_DETAIL_PRODUCT_SUCCESS:
            state = {
                ...state,
                loadingDetail: false,
                productOne: action.payload,
            };
            break;
        case GET_DETAIL_PRODUCT_ERROR:
            state = {
                ...state,
                loadingDetail: false,
                errorDetail: action.payload,
            };
            break;
        // GET_PRODUCT_BY_SIZE
        case GET_RELATE_PRODUCT_REQUEST:
            state = {
                ...state,
                loadingRelate: true,
            };
            break;
        case GET_RELATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                loadingRelate: false,
                relateProduct: action.payload,
            };
            break;
        case GET_RELATE_PRODUCT_ERROR:
            state = {
                ...state,
                loadingRelate: false,
                errorRelate: action.payload,
            };
            break;
        // GET_RELATE_PRODUCT
        case SEARCH_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case SEARCH_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                listProduct: action.payload,
            };
            break;
        case SEARCH_PRODUCT_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // SEARCH_PRODUCT

        case GET_ALL_PRODUCT_REQUEST:
            state = {
                ...state,
                loadingAll: true,
            };
            break;
        case GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                loadingAll: false,
                listProduct: action.payload
            };
            break;
        case GET_ALL_PRODUCT_ERROR:
            state = {
                ...state,
                loadingAll: false,
                errorAll: action.payload,
            };
            break;
        // GET ALL PRODUCT

        case UPDATE_REVIEW_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                listProduct: updateProductReview(state.listProduct, action.payload)
            }
            break;

        case GET_PRODUCT_HOME_REQUEST:
            state = {
                ...state,
                loadingHome: true,
            };
            break;
        case GET_PRODUCT_HOME_SUCCESS:
            state = {
                ...state,
                loadingHome: false,
                productsHome: action.payload
            };
            break;
        case GET_PRODUCT_HOME_ERROR:
            state = {
                ...state,
                loadingHome: false,
                errorHome: action.payload,
            };
            break;
        // GET ALL PRODUCT
    }
    return state;
};

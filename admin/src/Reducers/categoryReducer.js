import {
    ADD_CATEGORY_ERROR,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_ERROR,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
    SEARCH_CATEGORY_REQUEST,
    SEARCH_CATEGORY_SUCCESS,
    SEARCH_CATEGORY_ERROR,
} from "../Constants/categoryConstant";

const initialState = {
    loading: false,
    categories: [],
    error: null,
    categoryOne: {},
};

function addCategory(categories, newCategory) {
    categories.push(newCategory);
    return categories;
}

function deleteCategory(categories, id) {
    categories = categories.filter((x) => x._id !== id);
    return categories;
}

function updateCategory(categories, upCate) {
    const index = categories.findIndex((x) => x._id === upCate._id);
    categories[index].name = upCate.name;
    categories[index].image = upCate.image;
    return categories;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case ADD_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: addCategory(state.categories, action.payload),
            };
            break;
        case ADD_CATEGORY_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;

        case GET_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload,
                loading: false,
            };
            break;
        case GET_CATEGORIES_ERROR:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        case DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: deleteCategory(state.categories, action.payload),
                loading: false,
            };
            break;
        case DELETE_CATEGORY_ERROR:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        case GET_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_CATEGORY_SUCCESS:
            state = {
                ...state,
                categoryOne: action.payload,
                loading: false,
            };
            break;
        case GET_CATEGORY_ERROR:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        case UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: updateCategory(state.categories, action.payload),
                loading: false,
            };
            break;
        case UPDATE_CATEGORY_ERROR:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;

        case SEARCH_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case SEARCH_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload,
                loading: false,
            };
            break;
        case SEARCH_CATEGORY_ERROR:
            state = {
                ...state,
                error: action.payload,
                loading: false,
            };
            break;
    }
    return state;
};

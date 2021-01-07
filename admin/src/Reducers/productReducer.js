import {
    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_ERROR,
    GET_ALL_PRODUCT_REQUEST,
    GET_ALL_PRODUCT_SUCCESS,
    GET_PRODUCT_ERROR,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    POST_PRODUCT_ERROR,
    POST_PRODUCT_REQUEST,
    POST_PRODUCT_SUCCESS,
    RELOAD_GET_PRODUCT,
    SEARCH_PRODUCT_ERROR,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
} from "../Constants/productConstant";

const initialState = {
    loading: false,
    products: [],
    error: null,
    productOne: {},
    loadingOne: false,
    errorOne: null,
    loadingUpdate: false,
    errorUpdate: null
};

function addProduct(products, newProduct) {
    products.push(newProduct);
    return products;
}

function deleteProduct(products, id) {
    products = products.filter((x) => x._id !== id);
    return products;
}

function updateProduct(products, newProduct) {
    const index = products.findIndex((x) => x._id === newProduct._id);
    products[index].name = newProduct.name;
    products[index].price = newProduct.price;
    products[index].images = newProduct.images;
    products[index].sizes = newProduct.sizes;
    products[index].safeoff = newProduct.safeoff;
    return products;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload
            };
            break;
        case GET_ALL_PRODUCT_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;

        case POST_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case POST_PRODUCT_SUCCESS:
            let PRODUCTNEW = addProduct(state.products, action.payload);
            state = {
                ...state,
                loading: false,
                products: PRODUCTNEW,
            };
            break;
        case POST_PRODUCT_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;

        case GET_PRODUCT_REQUEST:
            state = {
                ...state,
                // loading: true,
                loadingOne: true,
            };
            break;
        case GET_PRODUCT_SUCCESS:
            state = {
                ...state,
                loadingOne: false,
                productOne: action.payload
            };
            break;
        case GET_PRODUCT_ERROR:
            state = {
                ...state,
                errorOne: action.payload,
                loadingOne: false,
            };
            break;

        // GET PRODUCT
        case RELOAD_GET_PRODUCT:
            state = {
                ...state,
                loadingOne: true,
                productOne: action.payload
            }
            break;
        // RELOAD PRODUCT ONE

        case DELETE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case DELETE_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: deleteProduct(state.products, action.payload),
                loading: false
            }
            break;
        case DELETE_PRODUCT_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break;

        case UPDATE_PRODUCT_REQUEST:
            state = {
                ...state,
                loadingUpdate: true
            }
            break;
        case UPDATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                loadingUpdate: false,
                products: updateProduct(state.products, action.payload),
                productOne: {}
            }
            break;
        case UPDATE_PRODUCT_ERROR:
            state = {
                ...state,
                loadingUpdate: false,
                errorUpdate: action.payload
            }
            break;
        case SEARCH_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case SEARCH_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload
            }
            break;
        case SEARCH_PRODUCT_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            break;

    }
    return state;
};

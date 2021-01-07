const {
    GET_PRODUCT_BY_CATEGORY_REQUEST,
    GET_PRODUCT_BY_CATEGORY_ERROR,
    GET_PRODUCT_BY_CATEGORY_SUCCESS,
    GET_PRODUCT_BY_SORT_REQUEST,
    GET_PRODUCT_BY_SORT_SUCCESS,
    GET_PRODUCT_BY_SORT_ERROR,
    GET_PRODUCT_BY_PRICE_REQUEST,
    GET_PRODUCT_BY_PRICE_ERROR,
    GET_PRODUCT_BY_PRICE_SUCCESS,
    GET_PRODUCT_BY_SIZE_REQUEST,
    GET_PRODUCT_BY_SIZE_ERROR,
    GET_PRODUCT_BY_SIZE_SUCCESS,
    GET_DETAIL_PRODUCT_REQUEST,
    GET_DETAIL_PRODUCT_SUCCESS,
    GET_DETAIL_PRODUCT_ERROR,
    GET_RELATE_PRODUCT_ERROR,
    GET_RELATE_PRODUCT_SUCCESS,
    GET_RELATE_PRODUCT_REQUEST,
    SEARCH_PRODUCT_ERROR,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_REQUEST,
    GET_ALL_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_ERROR,
    GET_PRODUCT_HOME_REQUEST,
    GET_PRODUCT_HOME_ERROR,
    GET_PRODUCT_HOME_SUCCESS
} = require("../Constants/ProductConstant");

const getProductByTypeAction = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_PRODUCT_BY_CATEGORY_REQUEST });
        fetch(`/api/product/type/${id}`)
            .then((res) => res.json())
            .then((result) => {
                // console.log("result by getProductByTypeAction", result);
                dispatch({ type: GET_PRODUCT_BY_CATEGORY_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_PRODUCT_BY_CATEGORY_ERROR, payload: err });
            });
    };
};

const sortProductAction = (parameter, value, id) => {
    return (dispatch) => {
        dispatch({ type: GET_PRODUCT_BY_SORT_REQUEST });
        fetch("/api/product/sort", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parameter,
                value,
                id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                dispatch({ type: GET_PRODUCT_BY_SORT_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_PRODUCT_BY_SORT_ERROR, payload: err });
            });
    };
};

const filterProductAction = (max, min, id) => {
    return (dispatch) => {
        dispatch({ type: GET_PRODUCT_BY_PRICE_REQUEST });
        fetch("/api/product/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                max,
                min,
                id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("filterProductAction", result);
                dispatch({ type: GET_PRODUCT_BY_PRICE_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_PRODUCT_BY_PRICE_ERROR, payload: err });
            });
    };
};

const searchSizeProductAction = (item, id) => {
    return (dispatch) => {
        dispatch({ type: GET_PRODUCT_BY_SIZE_REQUEST });
        fetch("/api/product/size", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: item,
                id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                dispatch({ type: GET_PRODUCT_BY_SIZE_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_PRODUCT_BY_SIZE_ERROR, payload: err });
            });
    };
};

const getProductAction = (slug) => {
    return (dispatch) => {
        dispatch({ type: GET_DETAIL_PRODUCT_REQUEST });
        fetch(`/api/product/detail/${slug}`)
            .then((res) => res.json())
            .then((result) => {
                dispatch({
                    type: GET_DETAIL_PRODUCT_SUCCESS,
                    payload: result,
                });
            })
            .catch((err) => {
                dispatch({ type: GET_DETAIL_PRODUCT_ERROR, payload: err });
            });
    };
};

const relateProductAction = (typeById, id) => {
    return (dispatch) => {
        dispatch({ type: GET_RELATE_PRODUCT_REQUEST });
        fetch("/api/product/relate-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                typeById,
                id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log("result by relateProductAction", result);
                dispatch({ type: GET_RELATE_PRODUCT_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_RELATE_PRODUCT_ERROR, payload: err });
            });
    };
};

const searchProductAction = (text, history) => {
    return (dispatch) => {
        dispatch({ type: SEARCH_PRODUCT_REQUEST });
        fetch("/api/product/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                search: text,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result by searchProductAction", result);
                const { success, product } = result;
                if (Object.is(success, true)) {
                    dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: product });
                    history.push('/tim-kiem');
                }
            })
            .catch((err) => {
                dispatch({ type: SEARCH_PRODUCT_ERROR, payload: err });
            });
    };
};



const getProductAllAction = () => {
    return (dispatch) => {
        dispatch({ type: GET_ALL_PRODUCT_REQUEST });
        fetch('/api/product')
            .then((res) => res.json())
            .then((result) => {
                dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: result });
            }).catch((err) => {
                dispatch({ type: GET_ALL_PRODUCT_ERROR, payload: err });
            });
    }
}

const getProductHomeAction = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_PRODUCT_HOME_REQUEST });
        fetch(`/api/product/home/${id}`)
            .then((res) => res.json())
            .then((result) => {
                // console.log("result by getProductHomeAction", result);
                const { products, success } = result;
                if (Object.is(success, true) && products.length > 0) {
                    dispatch({ type: GET_PRODUCT_HOME_SUCCESS, payload: products });
                }
            }).catch((err) => {
                dispatch({ type: GET_PRODUCT_HOME_ERROR, payload: err });
            });
    }
}

export {
    getProductByTypeAction,
    sortProductAction,
    filterProductAction,
    searchSizeProductAction,
    getProductAction,
    relateProductAction,
    searchProductAction,
    getProductAllAction,
    getProductHomeAction
};

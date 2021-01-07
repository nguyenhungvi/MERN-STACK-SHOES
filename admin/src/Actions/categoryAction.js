const {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_ERROR,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_ERROR,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
    SEARCH_CATEGORY_REQUEST,
    SEARCH_CATEGORY_ERROR,
    SEARCH_CATEGORY_SUCCESS,
} = require("../Constants/categoryConstant");

const getCategoriesAction = () => {
    return (dispatch) => {
        dispatch({ type: GET_CATEGORIES_REQUEST });
        fetch("/api/category")
            .then((res) => res.json())
            .then((result) => {
                if (result.error) {
                    dispatch({ type: GET_CATEGORIES_ERROR, payload: result.error });
                }
                if (result) {
                    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: result });
                }
            })
            .catch((err) => {
                dispatch({ type: GET_CATEGORIES_ERROR, payload: err });
            });
    };
};

const addCategoryAction = (name, image) => {
    return (dispatch) => {
        dispatch({ type: ADD_CATEGORY_REQUEST });
        fetch("/api/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
            body: JSON.stringify({
                image,
                name,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.error) {
                    dispatch({ type: ADD_CATEGORY_ERROR, payload: result.error });
                }
                if (result.success) {
                    console.log("result by addCategoryAction", result.data);
                    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: result.data });
                }
            })
            .catch((err) => {
                console.log("err", err);
                dispatch({ type: ADD_CATEGORY_ERROR, payload: err });
            });
    };
};

const deleteCategoryAction = (id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_CATEGORY_REQUEST });
        fetch(`/api/category/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: result._id });
            })
            .catch((err) => {
                dispatch({ type: DELETE_CATEGORY_ERROR, payload: err });
            });
    };
};

const getCategoryAction = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_CATEGORY_REQUEST });
        fetch(`/api/category/${id}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                dispatch({ type: GET_CATEGORY_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_CATEGORY_ERROR, payload: err });
            });
    };
};


const updateCategoryAction = (name, id, image) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });
        fetch(`/api/category/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
            body: JSON.stringify({
                name, image
            })
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("updateCategoryAction", result);
                dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: UPDATE_CATEGORY_ERROR, payload: err });
            });
    };
}

const searchCategoryAction = (text) => {
    return (dispatch) => {
        dispatch({ type: SEARCH_CATEGORY_REQUEST });
        fetch('/api/category/search', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
            body: JSON.stringify({
                search: text
            })
        })
            .then(res => res.json())
            .then((result) => {
                // console.log("result by searchCategoryAction", result);
                dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: result });
            }).catch((err) => {
                dispatch({ type: SEARCH_CATEGORY_ERROR, payload: err });
            });
    }
}

export {
    addCategoryAction,
    getCategoriesAction,
    deleteCategoryAction,
    getCategoryAction,
    updateCategoryAction,
    searchCategoryAction
};

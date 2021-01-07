const {
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_ERROR,
    GET_CATEGORY_SUCCESS,
} = require("../Constants/CategoryConstant");

const getCategoryAction = () => {
    return (dispatch) => {
        dispatch({ type: GET_CATEGORY_REQUEST });
        fetch("/api/category")
            .then((res) => res.json())
            .then((result) => {
                // console.log("result by getCategoryAction", result);
                dispatch({ type: GET_CATEGORY_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_CATEGORY_ERROR });
            });
    };
};

export { getCategoryAction };

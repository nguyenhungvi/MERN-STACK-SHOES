import {
    GET_ALL_REVIEW_ERROR,
    GET_ALL_REVIEW_REQUEST,
    GET_ALL_REVIEW_SUCCESS,
    GET_REVIEW_ERROR,
    GET_REVIEW_REQUEST,
    GET_REVIEW_SUCCESS,
    DELETE_REVIEW_ERROR,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS
} from "../Constants/reviewConstant";

const getReviewsAction = () => {
    return (dispatch) => {
        dispatch({ type: GET_REVIEW_REQUEST });
        fetch("/api/review/admin/home")
            .then((res) => res.json())
            .then((result) => {
                dispatch({ type: GET_REVIEW_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_REVIEW_ERROR, payload: err });
            });
    };
};

const getAllReviewAction = () => {
    return (dispatch) => {
        dispatch({ type: GET_ALL_REVIEW_REQUEST });
        fetch("/api/review")
            .then((res) => res.json())
            .then((result) => {
                dispatch({ type: GET_ALL_REVIEW_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_ALL_REVIEW_ERROR, payload: err });
            });
    };
}

const deleteReviewAction = (id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_REVIEW_REQUEST });
        fetch(`/api/review/${id}`,{
            method:"DELETE"
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result by deleteReviewAction", result);
                dispatch({ type: DELETE_REVIEW_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: DELETE_REVIEW_ERROR, payload: err });
            });
    };
}

export {
    getReviewsAction,
    getAllReviewAction,
    deleteReviewAction
}
import { UPDATE_REVIEW_PRODUCT_SUCCESS } from "../Constants/ProductConstant";
import {
  GET_REVIEW_ERROR,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  POST_REVIEW_ERROR,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
} from "../Constants/ReviewConstant";

const postReviewAction = (data) => {
  return (dispatch) => {
    dispatch({ type: POST_REVIEW_REQUEST });
    fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: POST_REVIEW_SUCCESS, payload: result.result });
        dispatch({ type: UPDATE_REVIEW_PRODUCT_SUCCESS, payload: result.data });
      })
      .catch((err) => {
        dispatch({ type: POST_REVIEW_ERROR, payload: err });
      });
  };
};

const getAllReviewAction = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_REVIEW_REQUEST });
    fetch(`/api/review/get-by-product/${id}`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("result by getReviewsAction", result);
        dispatch({ type: GET_REVIEW_SUCCESS, payload: result });
      })
      .catch((err) => {
        dispatch({ type: GET_REVIEW_ERROR, payload: err });
      });
  };
};

export { postReviewAction, getAllReviewAction };

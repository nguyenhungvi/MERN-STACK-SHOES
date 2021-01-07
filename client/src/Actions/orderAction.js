const {
    POST_ORDER_SUCCESS,
    POST_ORDER_REQUEST,
    POST_ORDER_ERROR,
} = require("../Constants/OrderConstant");

const postOrderAction = (info, cart) => {
    return (dispatch) => {
        dispatch({ type: POST_ORDER_REQUEST });
        fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                info,
                cart,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log("result by postOrderAction", result);
                const { message, order } = result;
                dispatch({ type: POST_ORDER_SUCCESS, payload: { message, order } });
            })
            .catch((err) => {
                dispatch({ type: POST_ORDER_ERROR, payload: err });
            });
    };
};

export { postOrderAction };

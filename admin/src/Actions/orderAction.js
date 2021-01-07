const {
    GET_ALL_ORDER_REQUEST,
    GET_ALL_ORDER_SUCCESS,
    GET_ALL_ORDER_ERROR,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,
    ORDER_THE_HOME_ERROR,
    ORDER_THE_HOME_REQUEST,
    ORDER_THE_HOME_SUCCESS,
    DELETE_ORDER_ERROR,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
} = require("../Constants/orderConstant");

const getAllOrderAction = () => {
    return (dispatch) => {
        dispatch({ type: GET_ALL_ORDER_REQUEST });
        fetch("/api/order/", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
        })
            .then((Res) => Res.json())
            .then((result) => {
                dispatch({ type: GET_ALL_ORDER_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_ALL_ORDER_ERROR, payload: err });
            });
    };
};

const getOrderAction = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_ORDER_REQUEST });
        fetch(`/api/order/${id}`)
            .then((Res) => Res.json())
            .then((result) => {
                dispatch({ type: GET_ORDER_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: GET_ORDER_ERROR, payload: err });
            });
    };
};

const updateOrderAction = (orderDetail, IndexStatus) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_ORDER_REQUEST });
        fetch("/api/order/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
            body: JSON.stringify({
                orderDetail,
                IndexStatus,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result by updateOrderAction", result);
                const { message, order } = result;
                dispatch({ type: UPDATE_ORDER_SUCCESS, payload: order });
            })
            .catch((err) => {
                dispatch({ type: UPDATE_ORDER_ERROR, payload: err });
            });
    };
};

const orderPageHome = () => {
    return (dispatch) => {
        dispatch({ type: ORDER_THE_HOME_REQUEST });
        fetch("/api/order/admin/home", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                const { totalMoney, orderNew } = result;
                dispatch({
                    type: ORDER_THE_HOME_SUCCESS,
                    payload: { totalMoney, orderNew },
                });
            })
            .catch((err) => {
                dispatch({ type: ORDER_THE_HOME_ERROR, payload: err });
            });
    };
};

const deleteOrderAction = (id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_ORDER_REQUEST });
        fetch(`/api/order/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result by deleteOrderAction", result);
                const { success, order } = result;
                // const { totalMoney, orderNew } = result;
                dispatch({
                    type: DELETE_ORDER_SUCCESS,
                    payload: order
                });
            })
            .catch((err) => {
                dispatch({ type: DELETE_ORDER_ERROR, payload: err });
            });
    };
}

export { getAllOrderAction, getOrderAction, updateOrderAction, orderPageHome, deleteOrderAction };

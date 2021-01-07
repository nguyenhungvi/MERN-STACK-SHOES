import {
    ADMIN_GET_ACCOUNT_ERROR,
    ADMIN_GET_ACCOUNT_REQUEST,
    ADMIN_GET_ACCOUNT_SUCCESS,
    ADMIN_LOGOUT,
    ADMIN_SIGNIN_ERROR,
    ADMIN_SIGNIN_REQUEST,
    ADMIN_SIGNIN_SUCCESS,
    ADMIN_GET_ACCOUNT_NEW_REQUEST,
    ADMIN_GET_ACCOUNT_NEW_ERROR,
    ADMIN_GET_ACCOUNT_NEW_SUCCESS,
    ADMIN_GET_CART_SUCCESS,
    ADMIN_GET_CART_REQUEST,
    ADMIN_GET_CART_ERROR,
    UPDATE_ACCOUNT_ADMIN_REQUEST,
    UPDATE_ACCOUNT_ADMIN_SUCCESS,
    UPDATE_ACCOUNT_ADMIN_ERROR,
    ADMIN_REGESTER_ACCOUNT_ERROR,
    ADMIN_REGESTER_ACCOUNT_REQUEST,
    ADMIN_REGESTER_ACCOUNT_SUCCESS,
} from "../Constants/authConstant";

const signinAdminAction = (email, password) => {
    return (dispatch) => {
        dispatch({ type: ADMIN_SIGNIN_REQUEST });
        fetch("/api/admin/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const { error, token, user } = result;
                console.log("token", token);
                if (error) {
                    dispatch({ type: ADMIN_SIGNIN_ERROR, payload: error });
                }
                if (token && user) {
                    localStorage.setItem("jwt_admin", token);
                    localStorage.setItem("admin", JSON.stringify(user));
                    dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: { token, user } });
                }
            })
            .catch((err) => {
                dispatch({ type: ADMIN_SIGNIN_ERROR, payload: err });
            });
    };
};

const isUserSignIn = () => {
    return (dispatch) => {
        const token = localStorage.getItem("jwt_admin")
            ? localStorage.getItem("jwt_admin")
            : "";
        if (token) {
            const user = JSON.parse(localStorage.getItem("admin"));
            dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: { token, user } });
        }
    };
};

const logout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch({ type: ADMIN_LOGOUT });
    };
};

const getAccountAction = () => {
    return (dispatch) => {
        dispatch({ type: ADMIN_GET_ACCOUNT_REQUEST });
        fetch("/api/admin/get-account", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                dispatch({ type: ADMIN_GET_ACCOUNT_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: ADMIN_GET_ACCOUNT_ERROR, payload: err });
            });
    };
};

const getAccountNewAction = () => {
    return (dispatch) => {
        dispatch({ type: ADMIN_GET_ACCOUNT_NEW_REQUEST });
        fetch("/api/admin/home")
            .then((res) => res.json())
            .then((result) => {
                // console.log("result by getAccountNewAction",result);
                dispatch({ type: ADMIN_GET_ACCOUNT_NEW_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: ADMIN_GET_ACCOUNT_NEW_ERROR, payload: err });
            });
    };
};

const getCartAction = () => {
    return (dispatch) => {
        dispatch({ type: ADMIN_GET_CART_REQUEST });
        fetch("/api/cart")
            .then((res) => res.json())
            .then((result) => {
                // console.log("result by getAccountNewAction", result);
                dispatch({ type: ADMIN_GET_CART_SUCCESS, payload: result });
            })
            .catch((err) => {
                dispatch({ type: ADMIN_GET_CART_ERROR, payload: err });
            });
    };
};

const updateAccountAction = (name, phone, address) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_ACCOUNT_ADMIN_REQUEST });
        fetch("/api/admin/update-info-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
            },
            body: JSON.stringify({
                name,
                phone,
                address,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const { message, success, user, error } = result;
                if (Object.is(success, true)) {
                    localStorage.setItem("admin", JSON.stringify(user));
                    dispatch({
                        type: UPDATE_ACCOUNT_ADMIN_SUCCESS,
                        payload: { message, user },
                    });
                }
                if (Object.is(success, false)) {
                    dispatch({ type: UPDATE_ACCOUNT_ADMIN_ERROR, payload: error });
                }
            })
            .catch((err) => {
                dispatch({ type: UPDATE_ACCOUNT_ADMIN_ERROR, payload: err });
            });
    };
};

const signupAdminAtion = (data) => {
    return (dispatch) => {
        dispatch({ type: ADMIN_REGESTER_ACCOUNT_REQUEST });
        fetch("/api/admin/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
                avatar: data.avatar
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result by signupAdminAtion", result);
                const { message, success, user, error } = result;
                if (Object.is(success, true)) {
                    dispatch({ type: ADMIN_REGESTER_ACCOUNT_SUCCESS, payload: { message, user } });
                }
                if (Object.is(success, false)) {
                    dispatch({ type: ADMIN_REGESTER_ACCOUNT_ERROR, payload: error });
                }
            })
            .catch((err) => {
                dispatch({ type: ADMIN_REGESTER_ACCOUNT_ERROR, payload: err });
            });
    };
};

export {
    signinAdminAction,
    isUserSignIn,
    logout,
    getAccountAction,
    getAccountNewAction,
    getCartAction,
    updateAccountAction,
    signupAdminAtion,
};

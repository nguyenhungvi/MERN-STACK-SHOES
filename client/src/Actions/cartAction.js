const {
    ADD_TO_CART,
    GET_CART,
    CLEAR_CART,
    ADD_CART_BY_SIGNIN,
    PLUS_QTY_PRODUCT_IN_CART,
    MINUS_QTY_PRODUCT_IN_CART,
    DELETE_PRODUCT_IN_CART,
} = require("../Constants/CartConstant");

const addToCartAction = (product) => {
    return (dispatch) => {
        let cartItem = JSON.parse(localStorage.getItem("cart"))
            ? JSON.parse(localStorage.getItem("cart"))
            : [];

        let result = cartItem.find(
            (x) => x._id.toString() === product._id.toString()
        );
        if (typeof result === "undefined") {
            cartItem.push({ ...product });
        }
        if (typeof result !== "undefined" && Object.keys(result).length > 0) {
            let d1 = cartItem.find(
                (x) => x.nameSize.toString() === product.nameSize.toString()
            );
            if (typeof d1 === "undefined") {
                let dataID = result._id.toString() === product._id.toString();
                let dataNameSize =
                    result.nameSize.toString() === product.nameSize.toString();
                if (dataID && !dataNameSize) {
                    cartItem.push({ ...product });
                }
            }
            // if (typeof d1 !== 'undefined' && Object.keys(d1).length > 0) {
            //     let dataID = result._id.toString() === product._id.toString();
            //     let dataNameSize = result.nameSize.toString() === product.nameSize.toString();
            //     console.log('====================================');
            //     console.log("DA CO D1");
            //     console.log('====================================');
            //     console.log('====================================');
            //     console.log("CHUA CO D1");
            //     console.log('====================================');
            //     console.log("dataID", dataID);
            //     console.log('====================================');
            //     console.log("dataNameSize", dataNameSize);
            //     console.log('====================================');
            // }
        }
        localStorage.setItem("cart", JSON.stringify(cartItem));
        dispatch({ type: ADD_TO_CART, payload: cartItem });
    };
};

const plusQuantityAction = (item) => {
    return async (dispatch) => {
        let cartItem = (await JSON.parse(localStorage.getItem("cart")))
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
        await cartItem.forEach((x) => {
            if (
                x._id.toString() === item._id.toString() &&
                x.nameSize.toString() === item.nameSize.toString()
            ) {
                x.quantity += 1;
            }
        });

        await localStorage.setItem("cart", JSON.stringify(cartItem));
        dispatch({ type: PLUS_QTY_PRODUCT_IN_CART, payload: cartItem });
    };
};

const minusQuantityAction = (item) => {
    return async (dispatch) => {
        let cartItem = (await JSON.parse(localStorage.getItem("cart")))
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
        await cartItem.forEach((x) => {
            if (
                x._id.toString() === item._id.toString() &&
                x.nameSize.toString() === item.nameSize.toString()
            ) {
                x.quantity = x.quantity - 1;
                if (x.quantity === 0) {
                    cartItem = cartItem
                        .filter(
                            (y) =>
                                y._id.toString() === item._id.toString() &&
                                y.nameSize.toString() !== item.nameSize.toString()
                        )
                        .concat(
                            cartItem.filter((a) => a._id.toString() !== item._id.toString())
                        );
                    return;
                }
            }
        });

        await localStorage.setItem("cart", JSON.stringify(cartItem));
        dispatch({ type: MINUS_QTY_PRODUCT_IN_CART, payload: cartItem });
    };
};

const deleteByProductAction = (item) => {
    return (dispatch) => {
        let cartItem = (JSON.parse(localStorage.getItem("cart")))
            ? JSON.parse(localStorage.getItem("cart"))
            : [];

        cartItem = cartItem
            .filter(
                (y) =>
                    y._id.toString() === item._id.toString() &&
                    y.nameSize.toString() !== item.nameSize.toString()
            )
            .concat(cartItem.filter((a) => a._id.toString() !== item._id.toString()));

        localStorage.setItem("cart", JSON.stringify(cartItem));
        dispatch({ type: DELETE_PRODUCT_IN_CART, payload: cartItem });
    };
};

const getToCartAcion = () => {
    return (dispatch) => {
        let cartItem = JSON.parse(localStorage.getItem("cart"))
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
        dispatch({ type: GET_CART, payload: cartItem });
    };
};

const clearCartAction = () => {
    return (dispatch) => {
        const cartItem = [];
        localStorage.setItem("cart", JSON.stringify(cartItem));
        dispatch({ type: CLEAR_CART, payload: cartItem });
    };
};

const addCartSigninAction = (cartItem) => {
    return (dispatch) => {
        dispatch({ type: ADD_CART_BY_SIGNIN, payload: cartItem });
    };
};

export {
    addToCartAction,
    getToCartAcion,
    clearCartAction,
    addCartSigninAction,
    plusQuantityAction,
    minusQuantityAction,
    deleteByProductAction,
};

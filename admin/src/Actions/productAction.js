const {
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_ERROR,
  GET_ALL_PRODUCT_SUCCESS,
  POST_PRODUCT_ERROR,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_ERROR,
  RELOAD_GET_PRODUCT,
} = require("../Constants/productConstant");

const getAllProductAction = () => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCT_REQUEST });
    fetch("/api/product")
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: result });
      })
      .catch((err) => {
        dispatch({ type: GET_ALL_PRODUCT_ERROR, payload: err });
      });
  };
};

const postProductAction = (product) => {
  return (dispatch) => {
    dispatch({ type: POST_PRODUCT_REQUEST });
    fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
      },
      body: JSON.stringify({
        name: product.name,
        sizes: product.sizes,
        price: product.price,
        pictures: product.images,
        categoryById: product.categoryID,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: POST_PRODUCT_SUCCESS, payload: result });
      })
      .catch((err) => {
        dispatch({ type: POST_PRODUCT_ERROR, payload: err });
      });
  };
};

const deleteProductAction = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    fetch(`/api/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result by delete product", result);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: result._id });
      })
      .catch((err) => {
        dispatch({ type: DELETE_PRODUCT_ERROR, payload: err });
      });
  };
};

const getProductAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCT_REQUEST });
    try {
      const result = await fetch(`/api/product/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
        },
      }).then((res) => res.json());
      if (!result) {
        dispatch({ type: GET_PRODUCT_ERROR, payload: "Không tìm thây sản phẩm" });
        return;
      }
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_ERROR, payload: error });
    }
  };
};

const reloadGetProductAction = () => {
  const product = {};
  return (dispatch) => {
    dispatch({ type: RELOAD_GET_PRODUCT, payload: product });
  }
}

const updateProductAction = (product, id) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    fetch(`/api/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt_admin"),
      },
      body: JSON.stringify({
        name: product.name,
        sizes: product.sizes,
        price: product.price,
        pictures: product.images,
      })
    })
      .then(res => res.json())
      .then((result) => {
        console.log("result by update", result);
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: result });
      }).catch((err) => {
        dispatch({ type: UPDATE_PRODUCT_ERROR, payload: err });
      });
  }
}

const searchProductAction = (text) => {
  return (dispatch) => {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });
    fetch('/api/product/search', {
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
        dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: result });
      }).catch((err) => {
        dispatch({ type: SEARCH_PRODUCT_ERROR, payload: err });
      });
  }
}


export {
  getAllProductAction,
  postProductAction,
  deleteProductAction,
  getProductAction,
  updateProductAction,
  searchProductAction,
  reloadGetProductAction,
};

import { deleteOrderAction } from "../Actions/orderAction";
import {
    DELETE_ORDER_ERROR,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    GET_ALL_ORDER_ERROR,
    GET_ALL_ORDER_REQUEST,
    GET_ALL_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    ORDER_THE_HOME_ERROR,
    ORDER_THE_HOME_REQUEST,
    ORDER_THE_HOME_SUCCESS,
    UPDATE_ORDER_ERROR,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
} from "../Constants/orderConstant";

const initialState = {
    loading: false,
    error: null,
    listOrder: [],
    orderDetail: {},
    totalMoney: 0,
    orderNew: [],
    loadingGET: false,
    errorGET: null
};

const updateOrder = (listOrder, updateOrder) => {
    let index = listOrder.findIndex((x) => x._id === updateOrder._id);
    listOrder[index].status = updateOrder.status;
    return listOrder;
}

const deleteOrder = (listOrder, order) => {
    listOrder = listOrder.filter((x) => x._id !== order._id);
    return listOrder;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case GET_ALL_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false,
                listOrder: action.payload,
            };
            break;
        case GET_ALL_ORDER_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // GET ALL ORDER
        case GET_ORDER_REQUEST:
            state = {
                ...state,
                loadingGET: true,
            };
            break;
        case GET_ORDER_SUCCESS:
            state = {
                ...state,
                loadingGET: false,
                orderDetail: action.payload,
            };
            break;
        case GET_ORDER_ERROR:
            state = {
                ...state,
                loadingGET: false,
                errorGET: action.payload,
            };
            break;
        // GET ORDER
        case UPDATE_ORDER_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case UPDATE_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false,
                listOrder: updateOrder(state.listOrder, action.payload)
            }
            break;
        case UPDATE_ORDER_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // UPDATE ORDER
        case ORDER_THE_HOME_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case ORDER_THE_HOME_SUCCESS:
            state = {
                ...state,
                loading: false,
                totalMoney: action.payload.totalMoney,
                orderNew: action.payload.orderNew
            }
            break;
        case ORDER_THE_HOME_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // UPDATE ORDER
        case DELETE_ORDER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case DELETE_ORDER_SUCCESS:
            state = {
                ...state,
                loading: false,
                listOrder: deleteOrder(state.listOrder, action.payload),
            };
            break;
        case DELETE_ORDER_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        // GET ORDER
    }
    return state;
};

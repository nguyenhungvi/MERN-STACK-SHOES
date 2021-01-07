import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import categoryReducer from './categoryReducer';
import orderReducer from './orderReducer';
import productReducer from './productReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    review: reviewReducer
});

export default rootReducer;
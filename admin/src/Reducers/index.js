import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    review: reviewReducer
});

export default rootReducer;
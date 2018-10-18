import { combineReducers } from 'redux';
import transReducer from './transReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    transactions: transReducer,
    user: userReducer,
    cart: cartReducer
});

export default rootReducer;

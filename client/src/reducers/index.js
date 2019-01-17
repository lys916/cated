import { combineReducers } from 'redux';
import miscReducer from './miscReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
   misc: miscReducer,
   user: userReducer,
   cart: cartReducer
});

export default rootReducer;

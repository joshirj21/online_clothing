import { combineReducers } from 'redux';
// import login from './login';
// import register from './register';
import product from "./product";
import auth from './auth'

export default combineReducers({
  auth,
  product
})
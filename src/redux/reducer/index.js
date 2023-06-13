import handleCart from './handleCart'
import { combineReducers } from "redux";
import handleLogin from "./handleLogin";
const rootReducers = combineReducers({
    handleCart,
    handleLogin,
})
export default rootReducers
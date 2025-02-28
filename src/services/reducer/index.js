import { combineReducers } from "redux";
import productReducer from "./ProductReducer";
import authReducer from "./AuthAction";

const reducer = combineReducers({
    productReducer,
    authReducer
})

export default reducer;

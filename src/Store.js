import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./services/reducer";
import {thunk} from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;


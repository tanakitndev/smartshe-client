import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";

export default createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(reduxThunk)));
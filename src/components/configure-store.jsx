import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import tagsModalReducer from "./tags-modal/tags-modal-reducer";
import boardReducer from "./board/board-reducer";
import waterfallReducer from "./board/layout-refresher/waterfall-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({ boardReducer, tagsModalReducer, waterfallReducer });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

import { applyMiddleware, combineReducers, createStore } from "redux";
import tagsModalReducer from "./tags-modal/tags-modal-reducer";
import boardReducer from "./board/board-reducer";
import waterfallReducer from "./board/layout-refresher/waterfall-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({ boardReducer, tagsModalReducer, waterfallReducer });

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

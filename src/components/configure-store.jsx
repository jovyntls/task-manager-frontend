import { applyMiddleware, combineReducers, createStore } from "redux";
import tagsModalReducer from "./tags-modal/tags-modal-reducer";
import boardReducer from "./board/board-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({ boardReducer, tagsModalReducer });

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

import { applyMiddleware, combineReducers, createStore } from "redux";
import { tagReducer } from "./tags/reducer";
import tagsModalReducer from "./tags-modal/tags-modal-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({ tagReducer, tagsModalReducer });

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

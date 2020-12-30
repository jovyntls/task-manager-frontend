import { applyMiddleware, combineReducers, createStore } from "redux";
import tagsModalReducer from "./tags-modal/tags-modal-reducer";
import thunkMiddleware from "redux-thunk";

// const rootReducer = combineReducers({ tagReducer, tagsModalReducer });
const rootReducer = combineReducers({ tagsModalReducer });

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

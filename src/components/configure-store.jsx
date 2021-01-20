import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import tagsModalReducer from "src/reducers/tags-modal-reducer";
import boardReducer from "src/reducers/board-reducer";
import waterfallReducer from "src/reducers/waterfall-reducer";
import viewOptionsReducer from "src/reducers/view-options-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({ boardReducer, tagsModalReducer, waterfallReducer, viewOptionsReducer });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

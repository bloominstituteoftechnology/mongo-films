import { combineReducers } from "redux";
import { filmsReducer } from "./filmsReducer";
const reducers = combineReducers({ filmsReducer });
export { reducers };

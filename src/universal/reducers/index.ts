import { combineReducers, Reducer } from "redux";

import { IState, IAboutState, IApiState, ILocationState } from "../models";
import movies from "./about";

export default combineReducers<IState>({
    movies,
});

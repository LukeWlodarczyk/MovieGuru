import { combineReducers } from "redux";

import movies from "./movies";
import movie from "./movie";

import { IState } from '../models'

export default combineReducers<IState>({
    movies,
    movie,
});

import { combineReducers } from "redux";

import movies from "./movies";
import movie from "./movies";

import { IState } from '../models'

export default combineReducers<IState>({
    movies,
    movie,
});

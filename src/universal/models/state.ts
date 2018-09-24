import { IMoviesState } from "./movies";
import { IMovieState } from "./movie";

export interface IState {
    readonly movies: IMoviesState;
    readonly movie: IMovieState;
}

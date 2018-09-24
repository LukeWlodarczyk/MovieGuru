import { IMoviesState } from "./moviesState";
import { IMovieState } from "./movieState";

export interface IState {
    readonly movies: IMoviesState;
    readonly movie: IMovieState;
}

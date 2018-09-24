import { IMovie } from './'

export interface IMovieState {
    readonly data: IMovie;
    readonly isLoading: boolean;
    readonly isError: boolean;
}

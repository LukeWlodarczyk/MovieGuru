import { IMovie } from './'

export interface IMoviesState {
    readonly data: IMovie[];
    readonly isLoading: boolean;
    readonly isError: boolean;
}

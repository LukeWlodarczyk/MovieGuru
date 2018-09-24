import { ActionCreator } from "redux";
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { IState } from "../models";


import { FETCH_MOVIE_FAILURE, FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS } from '../constants/types';

export type MovieAction =
    | FetchMovieRequest
    | FetchMovieFailure
    | FetchMovieSuccess;

const getMovieRequest = () => ({
  type: FETCH_MOVIE_REQUEST as typeof FETCH_MOVIE_REQUEST,
})

const getMovieSuccess = (data:object[]) => ({
  type: FETCH_MOVIE_SUCCESS as typeof FETCH_MOVIE_SUCCESS,
  payload: data
})

const getMovieFailure= () => ({
  type: FETCH_MOVIE_FAILURE as typeof FETCH_MOVIE_FAILURE ,
})

export type FetchMovieFailure = ReturnType<typeof getMovieFailure>;
export type FetchMovieRequest = ReturnType<typeof getMovieRequest>;
export type FetchMovieSuccess = ReturnType<typeof getMovieSuccess>;


export const getMovie: ActionCreator<ThunkAction<Promise<void>, IState, AxiosInstance, MovieAction>> = (id:string) => async (dispatch, _, api: AxiosInstance) => {
    dispatch(getMovieRequest());

    try {
      const res = await api.get(`/v1/movies/${id}`);

      dispatch(getMovieSuccess(res.data.data));

    } catch(e) {
      dispatch(getMovieFailure());
    }
}

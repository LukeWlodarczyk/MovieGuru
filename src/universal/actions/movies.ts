import { ActionCreator } from "redux";
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { IState } from "../models";

import { FETCH_MOVIES_FAILURE, FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS } from '../constants/types';

export type MoviesAction =
    | FetchMoviesRequest
    | FetchMoviesFailure
    | FetchMoviesSuccess;

const getMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST as typeof FETCH_MOVIES_REQUEST,
})

const getMoviesSuccess = (data:object[]) => ({
  type: FETCH_MOVIES_SUCCESS as typeof FETCH_MOVIES_SUCCESS,
  payload: data
})

const getMoviesFailure= () => ({
  type: FETCH_MOVIES_FAILURE as typeof FETCH_MOVIES_FAILURE ,
})

export type FetchMoviesFailure = ReturnType<typeof getMoviesFailure>;
export type FetchMoviesRequest = ReturnType<typeof getMoviesRequest>;
export type FetchMoviesSuccess = ReturnType<typeof getMoviesSuccess>;


export const getMovies: ActionCreator<ThunkAction<Promise<void>, IState, AxiosInstance, MoviesAction>> = () => async (dispatch, _, api) => {
    dispatch(getMoviesRequest());

    try {
      const res = await api.get(`/v1/movies`);
      
      dispatch(getMoviesSuccess(res.data.data));

    } catch(e) {
      dispatch(getMoviesFailure());
    }
}

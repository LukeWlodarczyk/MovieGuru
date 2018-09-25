import {
    FETCH_MOVIE_FAILURE,
    FETCH_MOVIE_REQUEST,
    FETCH_MOVIE_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS
} from "../constants/types";

import { IMovieState } from '../models';


const initialState = {
    isLoading: false,
    isError: false,
    data: {},
};

export default (state = initialState, action):IMovieState => {
    switch (action.type) {
        case FETCH_MOVIE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: { ...action.payload }
            };
        case FETCH_MOVIE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}

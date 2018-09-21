import axios from "axios";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

import { IAbout, IState } from "../models";

export type AboutAction =
    | FetchDescriptionFailure
    | FetchDescriptionRequest
    | FetchDescriptionSuccess;

export const FETCH_ABOUT_REQUEST = "FETCH_ABOUT_REQUEST";
export const FETCH_ABOUT_FAILURE = "FETCH_ABOUT_FAILURE";
export const FETCH_ABOUT_SUCCESS = "FETCH_ABOUT_SUCCESS";

export const fetchAboutRequest = () => ({
    type: FETCH_ABOUT_REQUEST,
    payload: '',

});
export const fetchAboutFailure = () => ({
    type: FETCH_ABOUT_FAILURE,
    payload: '',
});
export const fetchAboutSuccess = (data: object) => ({
    type: FETCH_ABOUT_SUCCESS,
    payload: data
});

export type FetchDescriptionRequest = ReturnType<typeof fetchAboutRequest>;
export type FetchDescriptionFailure = ReturnType<typeof fetchAboutFailure>;
export type FetchDescriptionSuccess = ReturnType<typeof fetchAboutSuccess>;

interface IMyState { }

export const fetchDescription = () => {
    return async (dispatch) => {
        dispatch(fetchAboutRequest());
        try {
            const response = await axios.get('/api/v1/movies')
            console.log(response)
            dispatch(fetchAboutSuccess(response));
        } catch (e) {
            console.log(e);
        }
    };
};

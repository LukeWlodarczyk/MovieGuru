import {
    AboutAction,
    FETCH_ABOUT_FAILURE,
    FETCH_ABOUT_REQUEST,
    FETCH_ABOUT_SUCCESS
} from "../actions";
import { IAboutState } from "../models";

const initialAboutState = {
    isLoading: false,
    isError: false,
    data: {},
};

export default function about(state = initialAboutState, action) {
    switch (action.type) {
        case FETCH_ABOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_ABOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case FETCH_ABOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}

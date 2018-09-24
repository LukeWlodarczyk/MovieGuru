import {
    FETCH_MOVIES_FAILURE,
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS
} from "../constants/types";


const initialState = {
    isLoading: false,
    isError: false,
    data: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [...action.payload]
            };
        case FETCH_MOVIES_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}

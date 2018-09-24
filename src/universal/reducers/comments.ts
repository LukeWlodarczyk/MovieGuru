import {
    FETCH_COMMENTS_FAILURE,
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS
} from "../constants/types";


const initialState = {
    isLoading: false,
    isError: false,
    data: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [...action.payload]
            };
        case FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}

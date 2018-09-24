import { ActionCreator } from "redux";
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { IState } from "../models";

import { ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from '../constants/types';

export type CommentAction =
    | AddCommentRequest
    | AddCommentFailure
    | AddCommentSuccess;

const addCommentRequest = () => ({
  type: ADD_COMMENT_REQUEST as typeof ADD_COMMENT_REQUEST,
})

const addCommentSuccess = (data:object[]) => ({
  type: ADD_COMMENT_SUCCESS as typeof ADD_COMMENT_SUCCESS,
  payload: data
})

const addCommentFailure= () => ({
  type: ADD_COMMENT_FAILURE as typeof ADD_COMMENT_FAILURE ,
})

export type AddCommentFailure = ReturnType<typeof addCommentFailure>;
export type AddCommentRequest = ReturnType<typeof addCommentRequest>;
export type AddCommentSuccess = ReturnType<typeof addCommentSuccess>;

export const addComment: ActionCreator<ThunkAction<Promise<void>, IState, AxiosInstance, CommentAction>> = (commentData:{ title: string, movieId: string }) => async (dispatch, _, api: AxiosInstance) => {
    dispatch(addCommentRequest());

    try {
      const res = await api.post(`/v1/comments`, commentData);

      dispatch(addCommentSuccess(res.data.data));

    } catch(e) {
      dispatch(addCommentFailure());
    }
}

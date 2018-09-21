import { RouteProps } from "react-router-dom";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { IState } from "../universal/models";
import { fetchDescription } from "./actions";
import { LoadableMovie, LoadableHome } from "./loadable";



export const routes:Array<any> = [
    {
        path: "/",
        exact: true,
        component: LoadableHome
    },
    {
        path: "/movie/:id",
        component: LoadableMovie,
        fetchData: fetchDescription
    }
];

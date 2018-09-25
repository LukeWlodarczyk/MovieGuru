import * as Loadable from "react-loadable";
import Loading from "../components/Loading";

export const LoadableHome = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ "../pages/Home"),
    loading: Loading
});

export const LoadableMovie = Loadable({
    loader: () => import(/* webpackChunkName: "movie" */ "../pages/Movie"),
    loading: Loading
});

export const LoadableAddMovie = Loadable({
    loader: () => import(/* webpackChunkName: "addMovie" */ "../pages/AddMovie"),
    loading: Loading
});


export const loadHome = () => LoadableHome.preload();
export const loadMovie = () => LoadableMovie.preload();
export const loadAddMovie = () => LoadableAddMovie.preload();

import * as Loadable from "react-loadable";
import Loading from "../components/loading";

export const LoadableHome = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ "../pages/home"),
    loading: Loading
});

export const LoadableMovie = Loadable({
    loader: () => import(/* webpackChunkName: "movie" */ "../pages/movie"),
    loading: Loading
});

export const LoadableAddMovie = Loadable({
    loader: () => import(/* webpackChunkName: "addMovie" */ "../pages/addMovie"),
    loading: Loading
});


export const loadHome = () => LoadableHome.preload();
export const loadMovie = () => LoadableMovie.preload();
export const loadAddMovie = () => LoadableAddMovie.preload();

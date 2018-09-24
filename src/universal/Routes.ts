import App from './app';
// import { RouteConfig } from 'react-router-config';
import { LoadableHome, LoadableMovie } from './loadable';
import { fetchMovies } from './pages/home';
import Movie from './pages/movie';




export const routes: any[] = [
  {
    component: App,
    routes: [
      {
          path: "/",
          exact: true,
          component: LoadableHome,
          fetchData: fetchMovies,
      },
      {
          path: "/movie/:id",
          component: LoadableMovie,
      },
    ]
  }
];

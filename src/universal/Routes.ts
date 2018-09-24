import App from './app';
// import { RouteConfig } from 'react-router-config';
import { LoadableHome, LoadableMovie } from './loadable';
import { fetchMovies } from './pages/home';
import { fetchMovie } from './pages/movie';




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
          path: "/movies/:id",
          component: LoadableMovie,
          fetchData: fetchMovie,
      },
    ]
  }
];

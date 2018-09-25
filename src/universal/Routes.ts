import App from './App';
// import { RouteConfig } from 'react-router-config';
import { LoadableHome, LoadableMovie } from './loadable';
import { fetchMovies } from './pages/Home';
import { fetchMovie } from './pages/Movie';




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

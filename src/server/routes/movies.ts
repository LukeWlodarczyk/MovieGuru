import { MovieController } from "../controllers/movie";
import { catchErrors } from '../helpers';
import { parseMoviesQuery } from '../middlewares'

export class Movie {

    private movieController: MovieController = new MovieController()

    public routes({ apiv1, apiv2 }): void {

        apiv1('/movies')
            .get(parseMoviesQuery, catchErrors(this.movieController.getMovies))
            .post(catchErrors(this.movieController.addMovie))

        apiv1('/movies/:id')
            .get(catchErrors(this.movieController.getMovie))


    }

}

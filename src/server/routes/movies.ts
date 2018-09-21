import { MovieController } from "../controllers/movie";
import { catchErrors } from '../helpers';

export class Movie {

    private movieController: MovieController = new MovieController()

    public routes({ apiv1, apiv2 }): void {

        apiv1('/movies')
            .get(catchErrors(this.movieController.getMovies))
            .post(catchErrors(this.movieController.addMovie))


    }
}

import { MovieController } from "../controllers/movie";

export class Movie {

    private movieController: MovieController = new MovieController()

    public routes({ apiv1, apiv2 }): void {

        apiv1('/movies')
            .get(this.movieController.getMovies)
            .post(this.movieController.addMovie)


    }
}

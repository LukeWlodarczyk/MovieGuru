import { Request, Response, NextFunction, Application } from "express";

import MovieSchema from '../models/Movie';
import CommentSchema from '../models/Comment';
import { Movie } from "./movies";
import { Comment } from "./comments";



export class Routes {

    private movie: Movie = new Movie();
    private comment: Comment = new Comment();
    private movieModel = MovieSchema;
    private commentModel = CommentSchema;

    private api = (app: Application, version:string) => (endpoint: string) => {
        return app.route(`/api/${version}${endpoint}`)
    }

    public init(app: Application): void {

       this.movie.routes(
           {
               apiv1: this.api(app, 'v1'),
               apiv2: this.api(app, 'v2'),
            })

       this.comment.routes(
           {
               apiv1: this.api(app, 'v1'),
               apiv2: this.api(app, 'v2'),
            })


       app.route('/api/*')
        .all((req: Request, res: Response) => {
            res
              .status(400)
              .json({
                success: false,
                message: 'Invalid url'
              })
        })

        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            return res
                    .status(400)
                    .json({
                      success: false,
                      data: null,
                      message: `Error occured: ${err}` })
        })

    }
}

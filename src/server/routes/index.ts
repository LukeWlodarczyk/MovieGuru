import { ErrorRequestHandler, Request, Response, NextFunction, Application } from "express";

import { Movie } from "./movies";
import { Comment } from "./comments";



export class Routes {

    private movie: Movie = new Movie();
    private comment: Comment = new Comment();

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
            res.status(400).json({ success: false, message: 'Invalid url'})
        })

        app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {

            res.status(400).json({ success: false, data: null, message: `Error occured: ${err}` })
        })

    }
}

import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

const Comment = mongoose.model('comments');
const Movie = mongoose.model('movies');

import { validateComment } from '../validation';

interface Opts {
  movieId?: string
}

export class CommentController{

    public getComments = async (req: Request, res: Response):Promise<Response> => {
      const opts: Opts = req.query;

      for(const key in opts) {
           if (key === 'movieId') {
             opts['movie'] = opts['movieId'];
             delete opts['movieId'];
           } else opts[key] = undefined;
       }

      const comments = await Comment.find(opts);

      return res
              .status(200)
              .json({
                success: true,
                data: comments,
                message: 'Comments successfully fetched.'
              });

    }

    public addComment =  async (req: Request, res: Response):Promise<Response> => {

      const { errors, isValid } = validateComment(req.body);

      if (!isValid) {
        return res
                .status(400)
                .json({
                  success: false,
                  data: errors,
                  message: 'Validation failed. Check data property for more details.'
                })
      }

      const id: string = req.body.movieId;
      const movie = await Movie.findById(id);

      if(!movie) {
          return res
                  .status(404)
                  .json({
                    success: false,
                    data: null,
                    message: 'Movie with provided id does not exist. You cannot add comment to nonexistent movie.'
                  });
      }

      const comment = await Comment.create({
          text: req.body.text,
          movie: movie.id,
      });

      return res
              .status(201)
              .json({
                success: true,
                data: comment,
                message: 'Comment successfully created.'
              });
    }


}

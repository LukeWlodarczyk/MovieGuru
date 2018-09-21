import * as mongoose from 'mongoose';
import axios from 'axios';

import CommentSchema from '../models/Comment';
import { Request, Response } from 'express';

const Comment = mongoose.model('comments');
const Movie = mongoose.model('movies');

interface Opts {
  id?: string
}

export class CommentController{

    public getComments = async (req: Request, res: Response) => {
      const opts: Opts = req.query;

      for(const key in opts) {
           if (key !== 'movieId') opts[key] = undefined;
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

    public addComment =  async (req: Request, res: Response) => {

      if(!req.body.movieId) {
          return res
                  .status(400)
                  .json({
                    success: false,
                    data: null,
                    message: 'Request body should contain movie id.'
                  });
      }

      if(!req.body.text || req.body.text.length < 3) {
          return res
                  .status(400)
                  .json({
                    success: false,
                    data: null,
                    message: 'Request body should contain text at least 3 characters long.'
                  });
      }

      const id: string = req.body.movieId;

      const isValidId = mongoose.Types.ObjectId.isValid(id);

      if(!isValidId) {
          return res
                  .status(400)
                  .json({
                    success: false,
                    data: null,
                    message: 'Provided id is not valid.'
                  });
      }

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
          movieId: id,
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

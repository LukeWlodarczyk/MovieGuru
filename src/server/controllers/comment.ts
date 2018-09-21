import * as mongoose from 'mongoose';
import axios from 'axios';

import CommentSchema from '../models/Comment';
import { Request, Response } from 'express';

const Comment = mongoose.model('comments');


export class CommentController{

    public getComments = async (req: Request, res: Response) => {
      const opts: object = req.query;

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

    public addComment =  async (req: Request, res: Response) => {}


}

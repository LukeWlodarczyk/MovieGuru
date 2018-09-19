import mongoose from 'mongoose';
import axios from 'axios';

import CommentSchema from '../models/Comment';
import { Request, Response } from 'express';

const Comment = mongoose.model('comments');


export class CommentController{

    public getComments = async (req: Request, res: Response) => {}

    public addComment =  async (req: Request, res: Response) => {}


}

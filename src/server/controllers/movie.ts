import mongoose, { Model, Document } from 'mongoose';
import axios, { AxiosResponse } from 'axios';

import { Request, Response } from 'express';

const Movie = mongoose.model('movies');




export class MovieController{

    public getMovies = async (req: Request, res: Response) => {}

    public addMovie = async (req: Request, res: Response) => {}


}

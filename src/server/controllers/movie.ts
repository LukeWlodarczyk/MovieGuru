import * as mongoose from 'mongoose';
import axios, { AxiosResponse } from 'axios';

import { Request, Response } from 'express';

const Movie:any = mongoose.model('movies');

const baseUrl: string = 'http://www.omdbapi.com';
const apiKey: string = '?apikey=e01a9718';


export class MovieController{

    public getMovies = (req: Request, res: Response) => {

      Movie
        .find({})
        .then((movies: object[]) => {
            res.status(200).json({ success: true, data: movies, message: 'All movies successfully fetched.' });
        })
    }

    public addMovie = async (req: Request, res: Response) => {

      if(!req.body.title) {
          return res.status(400).json({ success: false, data: null, message: 'Request body should contain movie title' });
      }

      const title: RegExp = new RegExp(["^", req.body.title, "$"].join(""), "i");

      return axios
        .get(`${baseUrl}/${apiKey}&type=movie&t=${req.body.title.replace(' ', '_')}`)
        .then((response: AxiosResponse) => {
          if(response.data.Response === 'False') {
             return res
                     .status(404)
                     .json({ success: false, data: null, message: 'Movie with provided title does not exist in both application db and external API' });
          }

          return Movie.findOrCreate({ imdbID: response.data.imdbID })


        })
        .then(movie => {
          res
            .status(201)
            .json({
              success: true,
              data: movie,
              message: 'Movie successfully fetched from external API and added to application db'
            });
        })
    }


}

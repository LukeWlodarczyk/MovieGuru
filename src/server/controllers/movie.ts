import * as mongoose from 'mongoose';
import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';

import { prepareDataToSave  } from '../helpers';
import { GetMoviesReq } from '../middlewares'


const Movie = mongoose.model('movies');

const baseUrl: string = 'http://www.omdbapi.com';
const apiKey: string = '?apikey=e01a9718';


export class MovieController{

    public getMovies = async (req: GetMoviesReq, res: Response):Promise<Response> => {

      const movies: object[] = await Movie
                                        .find(req.filters)
                                        .skip(req.pagination.offset)
                                        .limit(req.pagination.per_page)
                                        .sort(req.sort_by)


      return res
              .status(200)
              .json({
                success: true,
                data: movies,
                message: 'Movies successfully fetched.'
              });
    }

    public addMovie = async (req: Request, res: Response):Promise<Response> => {


      if(!req.body.title) {
         return res
                  .status(400)
                  .json({
                    success: false,
                    data: null,
                    message: 'Request body should contain movie title.'
                  });
     }

     if(req.body.title.length < 3) {
        return res
                 .status(400)
                 .json({
                   success: false,
                   data: null,
                   message: 'Title should be at least 3 characters long.'
                 });
    }

     const resp: AxiosResponse = await axios.get(`${baseUrl}/${apiKey}&type=movie&t=${req.body.title.replace(' ', '_')}`);

     if(resp.data.Response === 'False') {
         return res
                 .status(404)
                 .json({
                   success: false,
                   data: null,
                   message: 'Movie with provided title does not exist.'
                 });
     }

      const movie = await Movie.findOne({ imdbID: resp.data.imdbID });

      if(movie) {
          return res
                  .status(400)
                  .json({
                    success: false ,
                    data: movie,
                    message: 'Movie with provided title already exists in application db'
                  })
      }

      const { response, ...movieData } = prepareDataToSave(resp.data);
      const createdMovie = await Movie.create(movieData);

      return res
              .status(201)
              .json({
                success: true,
                data: createdMovie ,
                message: 'Movie successfully fetched from external API and added to application db'
              });

    }

    public getMovie = async (req: Request, res: Response):Promise<Response> => {

      const id:string = req.params.id;

      const isValidId:boolean = mongoose.Types.ObjectId.isValid(id);

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
                  message: 'Movie with provided id does not exist.'
                });
      }

      return res
              .status(200)
              .json({
                  success: true,
                  data: movie,
                  message: 'Movie successfully fetched from db',
              })
    }
}

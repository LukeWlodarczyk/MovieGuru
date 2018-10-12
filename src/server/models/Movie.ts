import * as mongoose from "mongoose";

import  { IMovieType } from '../../universal/models';

export interface IMovieDocument extends mongoose.Document, IMovieType {}

export interface IMovieModel extends mongoose.Model<IMovieDocument> {}

const MovieSchema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    type: {
      type: String
    },
    director: {
      type: [String]
    },
    genre: {
      type: [String]
    },
    language: {
      type: [String]
    },
    production: {
      type: String
    },
    country: {
      type: [String]
    },
    actors: {
      type: [String]
    },
    released: {
      type: String
    },
    plot: {
      type: String
    },
    poster: {
      type: String
    },
    dvd: {
      type: String
    },
    awards: {
      type: String
    },
    boxOffice: {
      type: Number
    },
    metascore: {
      type: String
    },
    rated: {
      type: String
    },
    ratings: [
      {
        source: {
          type: String
        },
        value: {
          type: String
        }
      }
    ],
    runtime: {
      type: Number
    },
    writer: {
      type: [String]
    },
    year: {
      type: Number
    },
    website: {
      type: String
    },
    imdbID: {
      type: String
    },
    imdbRating: {
      type: Number
    },
    imdbVotes: {
      type: Number
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
      }
    ],
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  },
  {
    timestamps: {}
  }
);

export const Movie = mongoose.model<IMovieDocument, IMovieModel>("movies", MovieSchema);

export default Movie;

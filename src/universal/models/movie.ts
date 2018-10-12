import { IUser } from "../models";

interface IRating {
  _id: string;
  source: string;
  value: string;
}

interface Comment {
  _id: string;
  text: string;
  movie?: IMovie;
  author?: IUser;
}

export interface IMovieType {
  readonly director?: string[];
  readonly genre?: string[];
  readonly language?: string[];
  readonly country?: string[];
  readonly actors?: string[];
  readonly writer?: string[];
  readonly title?: string;
  readonly year?: number;
  readonly rated?: string;
  readonly released?: string;
  readonly runtime?: number;
  readonly plot?: string;
  readonly awards?: string;
  readonly poster?: string;
  readonly ratings?: IRating[];
  readonly metascore?: string;
  readonly imdbRating?: number;
  readonly imdbVotes?: number;
  readonly imdbID?: string;
  readonly type?: string;
  readonly dvd?: string;
  readonly boxOffice?: number;
  readonly production?: string;
  readonly website?: string;
  readonly comments?: [Comment];
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export interface IMovie extends IMovieType {
  readonly _id?: string;
  readonly __v?: string;
}

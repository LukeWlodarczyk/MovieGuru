import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import { IMovie } from '../../models';

import { Card } from './styled';

interface IMovieCard extends IMovie {
  idx: number
}

const MovieCard: SFC<IMovieCard> = ({ _id, idx, poster, title, genre, released, imdbRating, plot }) => (
  <Link to={`/movies/${_id}-${idx}`}>
    <Card>
      <img src={poster} alt={`Poster of the ${title} movie`} />
      <p>{title}</p>
      <p>{plot}</p>
    </Card>
  </Link>
);



export default MovieCard;

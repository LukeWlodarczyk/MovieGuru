import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import { IMovie } from '../../models';

import { Card } from './style';

const MovieCard: SFC<IMovie> = ({ title, plot, imdbID, _id, idx }) => (
  <Link to={`/movies/${_id}/${idx}`}>
    <p>{title}</p>
    <p>{plot}</p>
  </Link>
);



export default MovieCard;

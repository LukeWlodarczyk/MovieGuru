import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import { IMovie } from '../../models';

import { Card } from './styled';

const MovieCard: SFC<IMovie> = ({ title, plot, imdbID, _id, idx }) => (
  <Link to={`/movies/${_id}/${idx}`}>
    <Card>
      <p>{title}</p>
      <p>{plot}</p>
    </Card>
  </Link>
);



export default MovieCard;

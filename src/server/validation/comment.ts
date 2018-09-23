import * as Validator from 'validator';
import * as mongoose from 'mongoose';

import { isEmpty } from './'

interface ErrorObj {
  text?: string,
  movieId?: string
}

export const validateComment = data => {
  let errors: ErrorObj = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.movieId = !isEmpty(data.movieId) ? data.movieId : '';

  console.log(data.text)


  if (!Validator.isLength(data.text, { min: 5, max: 60 })) {
    errors.text = 'Text must be between 5 and 60 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (!mongoose.Types.ObjectId.isValid(data.movieId)) {
    errors.movieId = 'Provided id is not valid.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

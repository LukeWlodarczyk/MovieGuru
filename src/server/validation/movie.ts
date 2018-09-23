import * as Validator from 'validator';
import * as mongoose from 'mongoose';

import { isEmpty } from './'

interface ErrorObj {
  title?: string,
}

export const validateMovieTitle = data => {
  let errors: ErrorObj = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 3, max: 15 })) {
    errors.title = 'Title must be between 3 and 15 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}

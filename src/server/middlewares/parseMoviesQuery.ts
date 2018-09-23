import { Request, Response, NextFunction } from 'express';

import { createOpts  } from '../helpers';

export interface GetMoviesReq extends Request {
  filters?: object,
  pagination?: {
    offset: number,
    per_page: number
  },
  sort_by?: {
    [key: string]: string
  }

}

export const parseMoviesQuery = (req: GetMoviesReq, res: Response, next: NextFunction) => {

    req.filters = createOpts(req.query);

    const page = parseInt(req.query.page) || 1;
    const per_page = parseInt(req.query.per_page) || 10;
    const offset = (page * per_page) - per_page;
    req.pagination = {
      per_page,
      offset
    };

    req.sort_by = {
      [req.query.sort_by || 'createdAt']: req.query.order_by || 'desc'
    };


    next()
}

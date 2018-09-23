import { Request, Response, NextFunction } from 'express';

import { createOpts  } from '../helpers';

export interface ReqWithFilers extends Request {
  filters?: object,
  pagination?: {
    offset: number,
    per_page: number
  }
}

export const getFilters = (req: ReqWithFilers, res: Response, next: NextFunction) => {

    req.filters = createOpts(req.query);

    const page = parseInt(req.query.page) || 1;
    const per_page = parseInt(req.query.per_page) || 10;
    const offset = (page * per_page) - per_page;

    req.pagination = {
      per_page,
      offset
    }

    next()
}

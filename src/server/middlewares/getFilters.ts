import { Request, Response, NextFunction } from 'express';

import { createOpts  } from '../helpers';

export interface ReqWithFilers extends Request {
  filters?: object
}

export const getFilters = (req: ReqWithFilers, res: Response, next: NextFunction) => {
    req.filters = createOpts(req.query);
    next()
}

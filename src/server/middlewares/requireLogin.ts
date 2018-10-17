import { Request, Response, NextFunction } from "express";

export interface RequireLoginReq extends Request {
  user?: object;
}

export const requireLogin = (
  req: RequireLoginReq,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated. Please log in."
    });
  }

  next();
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";


type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync =
  (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: any) => {
      console.log(error);
      next(error);
    });
  };

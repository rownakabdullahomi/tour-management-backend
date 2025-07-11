
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";



export const checkAuth = (...authRoles: string[])=> async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No token");
      }

      const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload


      if(!authRoles.includes(verifiedToken.role)){
        throw new AppError(403, "Not permitted to view this route!!!");
      }

      console.log(verifiedToken);

      next()

    } catch (error) {
        next(error)
    }
  }
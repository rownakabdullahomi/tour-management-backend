/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../error/AppError";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let statusCode = 500;
  let message = `Something went wrong!!`

  /// Duplicate Error 
  if(error.code === 11000){
    const matchedArray = error.message.match(/"([^"]*)"/);
    statusCode = 400;
    message= `${matchedArray[1]} already exists`
  }
  /// Cast Error 
  else if(error.name === "CastError"){
    statusCode = 400;
    message= "Please provide a valid ID."
  }

  else if(error instanceof AppError){
    statusCode = error.statusCode
    message = error.message
  }
  else if (error instanceof Error){
    statusCode = 500;
    message = error.message
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};

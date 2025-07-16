/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../error/AppError";
import mongoose from "mongoose";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handleZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handleValidationError";



export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let statusCode = 500;
  let message = `Something went wrong!!`;
   let errorSources: any = [
    //   {
    //   path: "isDeleted",
    //   message: "Cast failed"
    // }
  ]

  /// Duplicate Error 
  if(error.code === 11000){

    const simplifiedError = handleDuplicateError(error)
    statusCode = simplifiedError.statusCode;
    message= simplifiedError.message
  }
  /// Cast Error 
  else if(error.name === "CastError"){
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode;
    message= simplifiedError.message
  }
  /// Mongoose Validation Error 
  else if(error.name === "ZodError"){
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode;
    message= simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  /// Validation Error 
  else if(error.name === "ValidationError"){
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
    message= simplifiedError.message
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
    errorSources,
    error,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
